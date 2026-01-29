# 📋 GitBook → Jira 자동화

기획팀이 GitBook으로 `docs/` 폴더에 push하면 AI가 분석하여 Jira 티켓을 자동 생성합니다.

## 🎯 동작 방식

```
GitBook 편집 → GitHub 동기화 → AI 분석 → Jira 티켓 생성
```

1. 기획팀이 GitBook에서 문서 작성/수정
2. GitBook이 `docs/` 폴더에 자동 커밋
3. GitHub Actions가 변경 감지
4. Claude AI가 "개발 작업 필요 여부" 분석
5. 필요 시 Jira 티켓 자동 생성 (중복 체크 포함)

## 📁 구조

```
.github/
├── workflows/gitbook-to-jira.yml   # 워크플로우
└── scripts/analyze-docs.js          # AI 분석 스크립트
docs/                                 # GitBook 동기화 폴더
```

## 🚀 설정

### 1. GitHub Secrets 추가

| Secret | 값 |
|--------|-----|
| `JIRA_URL` | `https://your-company.atlassian.net` |
| `JIRA_USERNAME` | `your.email@company.com` |
| `JIRA_API_TOKEN` | [생성하기](https://id.atlassian.com/manage-profile/security/api-tokens) |
| `JIRA_PROJECT_KEY` | Jira 프로젝트 키 (예: `SLEEP`) |
| `ANTHROPIC_API_KEY` | [생성하기](https://console.anthropic.com/) |

### 2. 파일 복사

```bash
# 레포에 복사
.github/workflows/gitbook-to-jira.yml
.github/scripts/analyze-docs.js
```

## 📝 문서 작성 팁

AI가 더 정확히 분석하려면 문서에 구조를 갖추면 좋아요:

```markdown
# 기능 제목

## 개요
무슨 기능인지

## 요구사항
- 요구사항 1
- 요구사항 2

## 인수 조건
- [ ] 조건 1
- [ ] 조건 2
```

## 🧪 테스트

Actions 탭에서 수동 실행 가능:
- **dry_run = true**: 티켓 생성 없이 분석만

## 📚 참고

- [mcp-atlassian](https://github.com/sooperset/mcp-atlassian)