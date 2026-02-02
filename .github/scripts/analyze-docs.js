/**
 * GitBook 문서 변경 분석 및 Jira 티켓 생성
 * - Claude AI로 문서 + 코드 분석
 * - 작업량(Story Points) 자동 추정
 * - Jira REST API로 직접 티켓 생성
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  jiraUrl: process.env.JIRA_URL?.replace(/\/$/, ''),
  jiraUsername: process.env.JIRA_USERNAME,
  jiraApiToken: process.env.JIRA_API_TOKEN,
  projectKey: process.env.JIRA_PROJECT_KEY,
  storyPointsField: process.env.JIRA_STORY_POINTS_FIELD || 'customfield_10016', // Story Points 커스텀 필드
  dryRun: process.env.DRY_RUN === 'true',
  changedFiles: JSON.parse(process.env.CHANGED_FILES || '[]'),
  codeBasePath: process.env.CODE_BASE_PATH || 'src', // 코드베이스 경로
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
    
    console.log(`      Jira API: ${options.method || 'GET'} ${endpoint}`);
    
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
    
    // HTML 응답 체크 (인증 실패 또는 잘못된 URL)
    if (text.startsWith('<!') || text.startsWith('<html')) {
      throw new Error(`Jira 인증 실패 또는 잘못된 URL입니다. Status: ${response.status}`);
    }
    
    if (!response.ok) {
      let errorMsg = `Jira API Error ${response.status}`;
      try {
        const errorJson = JSON.parse(text);
        errorMsg += `: ${JSON.stringify(errorJson.errors || errorJson.errorMessages || errorJson)}`;
      } catch {
        errorMsg += `: ${text.substring(0, 200)}`;
      }
      throw new Error(errorMsg);
    }

    return text ? JSON.parse(text) : null;
  }

  async searchIssues(jql) {
    // Jira Cloud는 POST /rest/api/3/search 사용
    return this.request('/search', {
      method: 'POST',
      body: JSON.stringify({
        jql: jql,
        maxResults: 5,
        fields: ['key', 'summary', 'status']
      })
    });
  }

  async createIssue({ project, issueType, summary, description, priority, labels, storyPoints }) {
    const fields = {
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
    };
    
    // Story Points 추가 (커스텀 필드)
    if (storyPoints && CONFIG.storyPointsField) {
      fields[CONFIG.storyPointsField] = storyPoints;
    }
    
    return this.request('/issue', {
      method: 'POST',
      body: JSON.stringify({ fields }),
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
      max_tokens: 4096,
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
// 코드베이스 분석
// =============================================================================
function getRelevantCode(docPath, docContent) {
  // 문서에서 관련 키워드 추출
  const keywords = extractKeywords(docContent);
  const relevantFiles = [];
  
  // 코드베이스에서 관련 파일 찾기
  try {
    const codeFiles = findCodeFiles(CONFIG.codeBasePath);
    
    for (const file of codeFiles.slice(0, 50)) { // 최대 50개 파일만
      try {
        const content = fs.readFileSync(file, 'utf8');
        const relevance = calculateRelevance(content, keywords);
        
        if (relevance > 0) {
          relevantFiles.push({
            path: file,
            relevance,
            preview: content.substring(0, 1000),
            lineCount: content.split('\n').length,
          });
        }
      } catch (e) {
        // 파일 읽기 실패 무시
      }
    }
    
    // 관련도 순으로 정렬, 상위 5개만
    return relevantFiles
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 5);
  } catch (e) {
    console.log(`   ⚠️ 코드 분석 실패: ${e.message}`);
    return [];
  }
}

function extractKeywords(content) {
  // 문서에서 주요 키워드 추출 (컴포넌트명, 함수명, 기능명 등)
  const patterns = [
    /[A-Z][a-z]+(?:[A-Z][a-z]+)+/g,  // PascalCase (컴포넌트명)
    /[a-z]+(?:[A-Z][a-z]+)+/g,       // camelCase (함수명)
    /`([^`]+)`/g,                      // 백틱 안의 코드
    /\b(api|screen|component|hook|service|util|store|reducer|action)\b/gi,
  ];
  
  const keywords = new Set();
  for (const pattern of patterns) {
    const matches = content.match(pattern) || [];
    matches.forEach(m => {
      const clean = m.replace(/`/g, '').toLowerCase();
      if (clean.length > 2) keywords.add(clean);
    });
  }
  
  return Array.from(keywords);
}

function findCodeFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // 무시할 디렉토리
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.next', 'coverage'].includes(entry.name)) {
        continue;
      }
      findCodeFiles(fullPath, files);
    } else if (entry.isFile()) {
      // 코드 파일만
      if (/\.(ts|tsx|js|jsx|swift|kt|java)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

function calculateRelevance(content, keywords) {
  let score = 0;
  const lowerContent = content.toLowerCase();
  
  for (const keyword of keywords) {
    const regex = new RegExp(keyword, 'gi');
    const matches = lowerContent.match(regex);
    if (matches) {
      score += matches.length;
    }
  }
  
  return score;
}

function summarizeCodeContext(relevantFiles) {
  if (!relevantFiles.length) return '관련 코드 파일을 찾지 못했습니다.';
  
  let summary = `관련 코드 파일 ${relevantFiles.length}개 발견:\n\n`;
  
  for (const file of relevantFiles) {
    summary += `### ${file.path} (${file.lineCount}줄)\n`;
    summary += '```\n' + file.preview + '\n...\n```\n\n';
  }
  
  return summary;
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

function buildPrompt(filePath, content, diff, codeContext) {
  return `기획 문서 변경을 분석하고, 현재 코드베이스를 참고하여 Jira 티켓과 작업량(Story Points)을 산정해주세요.

## 문서 파일: ${filePath}
${diff ? `## 변경 내용 (Diff)\n\`\`\`\n${diff.substring(0, 2000)}\n\`\`\`` : '## 신규 문서'}

## 현재 문서 내용
\`\`\`
${content.substring(0, 3000)}
\`\`\`

## 관련 코드베이스 분석
${codeContext}

## 판단 기준
1. 실제 개발 작업이 필요한 변경인가? (새 기능, API 변경, UI 변경 등)
2. 단순 문서 수정(오타, 설명 보완)은 티켓 불필요

## Story Points 기준 (피보나치)
- 1점: 간단한 수정 (텍스트 변경, 스타일 조정)
- 2점: 작은 기능 (새 버튼, 간단한 API 연동)
- 3점: 중간 기능 (새 화면 일부, 로직 추가)
- 5점: 큰 기능 (새 화면 전체, 복잡한 로직)
- 8점: 대규모 기능 (여러 화면, 아키텍처 변경)
- 13점: 에픽 수준 (분할 필요)

## 응답 (JSON만)
\`\`\`json
{
  "requiresTicket": true/false,
  "reason": "판단 근거 (한 줄)",
  "tickets": [
    {
      "type": "Story",
      "summary": "티켓 제목 (50자 이내, 한국어)",
      "description": "설명 (어떤 작업이 필요한지 구체적으로)",
      "priority": "High/Medium/Low",
      "storyPoints": 3,
      "estimateReason": "Story Points 산정 근거 (기존 코드 구조, 영향 범위 등)",
      "affectedFiles": ["예상되는 수정 파일 경로"],
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
  
  // URL 형식 확인
  if (!CONFIG.jiraUrl.includes('atlassian.net') && !CONFIG.jiraUrl.includes('jira')) {
    console.log(`⚠️ JIRA_URL이 올바른지 확인하세요: ${CONFIG.jiraUrl}`);
  }
  
  console.log(`🔗 Jira URL: ${CONFIG.jiraUrl}`);
  console.log(`📋 Project: ${CONFIG.projectKey}`);
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

      // 코드베이스 분석
      console.log('   🔍 관련 코드 분석 중...');
      const relevantCode = getRelevantCode(filePath, content);
      const codeContext = summarizeCodeContext(relevantCode);
      if (relevantCode.length) {
        console.log(`   📂 관련 파일 ${relevantCode.length}개 발견`);
      }

      // AI 분석
      console.log('   🤖 AI 분석 중...');
      const prompt = buildPrompt(filePath, content, diff, codeContext);
      const response = await analyzeWithClaude(prompt);
      const analysis = parseResponse(response);

      console.log(`   📊 ${analysis.requiresTicket ? '티켓 필요' : '티켓 불필요'}`);
      console.log(`   💬 ${analysis.reason}`);

      if (!analysis.requiresTicket || !analysis.tickets?.length) continue;

      // 티켓 생성
      for (const ticket of analysis.tickets) {
        console.log(`\n   🎫 [${ticket.type}] ${ticket.summary}`);
        console.log(`   ⏱️ Story Points: ${ticket.storyPoints || '미정'}`);
        if (ticket.estimateReason) {
          console.log(`   📐 산정 근거: ${ticket.estimateReason}`);
        }

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
          createdTickets.push({ 
            key: 'DRY-RUN', 
            url: '#', 
            summary: ticket.summary,
            storyPoints: ticket.storyPoints,
          });
        } else {
          // Description에 산정 근거와 영향 파일 추가
          let desc = ticket.description;
          if (ticket.estimateReason) {
            desc += `\n\n---\n**📐 Story Points 산정 근거:** ${ticket.estimateReason}`;
          }
          if (ticket.affectedFiles?.length) {
            desc += `\n\n**📂 예상 수정 파일:**\n${ticket.affectedFiles.map(f => `- ${f}`).join('\n')}`;
          }
          desc += `\n\n---\n📄 문서: ${filePath}`;
          
          const result = await jira.createIssue({
            project: CONFIG.projectKey,
            issueType: ticket.type,
            summary: ticket.summary,
            description: desc,
            priority: ticket.priority,
            labels: ticket.labels,
            storyPoints: ticket.storyPoints,
          });

          console.log(`   ✅ 생성: ${result.key}`);
          createdTickets.push({
            key: result.key,
            url: `${CONFIG.jiraUrl}/browse/${result.key}`,
            summary: ticket.summary,
            storyPoints: ticket.storyPoints,
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