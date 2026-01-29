/**
 * GitBook 문서 변경 분석 및 Jira 티켓 생성
 * - Claude AI로 문서 분석
 * - Jira REST API로 직접 티켓 생성
 */

const fs = require('fs');
const { execSync } = require('child_process');

const CONFIG = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  jiraUrl: process.env.JIRA_URL?.replace(/\/$/, ''),
  jiraUsername: process.env.JIRA_USERNAME,
  jiraApiToken: process.env.JIRA_API_TOKEN,
  projectKey: process.env.JIRA_PROJECT_KEY,
  dryRun: process.env.DRY_RUN === 'true',
  changedFiles: JSON.parse(process.env.CHANGED_FILES || '[]'),
};

// =============================================================================
// Jira REST API Client
// =============================================================================
class JiraClient {
  constructor(baseUrl, username, apiToken) {
    this.baseUrl = baseUrl;
    this.auth = Buffer.from(`${username}:${apiToken}`).toString('base64');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}/rest/api/3${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Jira API Error ${response.status}: ${text}`);
    }

    return text ? JSON.parse(text) : null;
  }

  async searchIssues(jql) {
    return this.request(`/search?jql=${encodeURIComponent(jql)}&maxResults=5`);
  }

  async createIssue({ project, issueType, summary, description, priority, labels }) {
    return this.request('/issue', {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          project: { key: project },
          issuetype: { name: issueType },
          summary: summary,
          description: {
            type: 'doc',
            version: 1,
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: description }]
            }]
          },
          priority: { name: priority || 'Medium' },
          labels: labels || [],
        }
      }),
    });
  }
}

// =============================================================================
// Claude API
// =============================================================================
async function analyzeWithClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CONFIG.anthropicApiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  
  if (!data.content?.[0]?.text) {
    throw new Error('Invalid Claude API response');
  }

  return data.content[0].text;
}

// =============================================================================
// 문서 분석
// =============================================================================
function getFileDiff(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let diff = null;
    
    try {
      diff = execSync(`git diff HEAD~1 HEAD -- "${filePath}"`, { encoding: 'utf8' });
    } catch (e) {
      // 새 파일인 경우
    }
    
    return { content, diff, isNew: !diff };
  } catch (e) {
    return { content: '', diff: null, isNew: true };
  }
}

function buildPrompt(filePath, content, diff) {
  return `기획 문서 변경을 분석하여 Jira 티켓이 필요한지 판단해주세요.

## 파일: ${filePath}
${diff ? `## 변경 내용 (Diff)\n\`\`\`\n${diff.substring(0, 3000)}\n\`\`\`` : '## 신규 문서'}

## 현재 문서 내용
\`\`\`
${content.substring(0, 5000)}
\`\`\`

## 판단 기준
1. 실제 개발 작업이 필요한 변경인가? (새 기능, API 변경, UI 변경 등)
2. 단순 문서 수정(오타, 설명 보완)은 티켓 불필요

## 응답 (JSON만)
\`\`\`json
{
  "requiresTicket": true/false,
  "reason": "판단 근거 (한 줄)",
  "tickets": [
    {
      "type": "Story",
      "summary": "티켓 제목 (50자 이내, 한국어)",
      "description": "설명",
      "priority": "High/Medium/Low",
      "labels": ["feature"]
    }
  ]
}
\`\`\``;
}

function parseResponse(text) {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('JSON not found');
  return JSON.parse(match[1] || match[0]);
}

// =============================================================================
// 메인
// =============================================================================
async function main() {
  console.log('🚀 GitBook → Jira 분석 시작\n');
  
  // 설정 검증
  const required = ['anthropicApiKey', 'jiraUrl', 'jiraUsername', 'jiraApiToken', 'projectKey'];
  for (const key of required) {
    if (!CONFIG[key]) {
      throw new Error(`${key}가 설정되지 않았습니다`);
    }
  }
  
  console.log(`📁 변경 파일: ${CONFIG.changedFiles.length}개`);
  console.log(`🔧 Dry Run: ${CONFIG.dryRun}\n`);

  if (!CONFIG.changedFiles.length) {
    console.log('✅ 분석할 파일 없음');
    return;
  }

  const jira = new JiraClient(CONFIG.jiraUrl, CONFIG.jiraUsername, CONFIG.jiraApiToken);
  const createdTickets = [];

  for (const filePath of CONFIG.changedFiles) {
    console.log(`\n📄 ${filePath}`);
    console.log('─'.repeat(40));

    try {
      const { content, diff, isNew } = getFileDiff(filePath);
      console.log(`   ${isNew ? '신규 문서' : '수정됨'}`);

      // AI 분석
      console.log('   🤖 AI 분석 중...');
      const prompt = buildPrompt(filePath, content, diff);
      const response = await analyzeWithClaude(prompt);
      const analysis = parseResponse(response);

      console.log(`   📊 ${analysis.requiresTicket ? '티켓 필요' : '티켓 불필요'}`);
      console.log(`   💬 ${analysis.reason}`);

      if (!analysis.requiresTicket || !analysis.tickets?.length) continue;

      // 티켓 생성
      for (const ticket of analysis.tickets) {
        console.log(`\n   🎫 [${ticket.type}] ${ticket.summary}`);

        // 중복 체크
        try {
          const searchResult = await jira.searchIssues(
            `project = "${CONFIG.projectKey}" AND summary ~ "${ticket.summary.substring(0, 30).replace(/"/g, '\\"')}" AND status != Done`
          );
          if (searchResult?.issues?.length) {
            console.log(`   ⚠️ 유사 티켓 존재: ${searchResult.issues[0].key}`);
            continue;
          }
        } catch (e) {
          console.log(`   ⚠️ 중복 체크 실패: ${e.message}`);
        }

        if (CONFIG.dryRun) {
          console.log('   🔍 [Dry Run] 생성 예정');
          createdTickets.push({ key: 'DRY-RUN', url: '#', summary: ticket.summary });
        } else {
          const desc = `${ticket.description}\n\n---\n📄 문서: ${filePath}`;
          const result = await jira.createIssue({
            project: CONFIG.projectKey,
            issueType: ticket.type,
            summary: ticket.summary,
            description: desc,
            priority: ticket.priority,
            labels: ticket.labels,
          });

          console.log(`   ✅ 생성: ${result.key}`);
          createdTickets.push({
            key: result.key,
            url: `${CONFIG.jiraUrl}/browse/${result.key}`,
            summary: ticket.summary,
          });
        }
      }
    } catch (error) {
      console.error(`   ❌ 에러: ${error.message}`);
    }
  }

  // 결과 저장
  fs.writeFileSync('/tmp/created_tickets.json', JSON.stringify(createdTickets, null, 2));

  console.log('\n' + '='.repeat(40));
  console.log(`📋 완료: ${createdTickets.length}개 티켓 생성`);
}

main().catch(e => {
  console.error('❌ Fatal:', e.message);
  process.exit(1);
});