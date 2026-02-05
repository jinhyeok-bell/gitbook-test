# 협업 규칙

## 문서 작성 원칙

- 변경사항은 관련 문서에 직접 반영한다.
- 결정사항은 해당 문서 섹션에 명시한다.
- 문서 버전 관리(버전 번호, 변경 이력)는 하지 않는다.
- 디테일한 디자인(색상 코드, 레이아웃 px 값 등)이나 코드는 문서에 포함하지 않는다.

### 파일명 규칙
- 프로젝트 수준 문서: 대문자 (예: `OVERVIEW.md`, `BACKGROUND.md`)
- 페이지/규칙 문서: 소문자 (예: `landing.md`, `collaboration.md`)

## 추상화 원칙

- CTA 문구는 추상화하여 작성 (예: "등록 CTA" - 구체적 문구는 디자이너가 결정)
- 필드명은 의미만 명시 (실제 키 이름은 개발자가 결정)
- 개발 구현 디테일은 기재하지 않음 (예: API 파라미터, DB 테이블 구조, 컬럼명)

## 기능 참조 원칙

- 기능 논의 시 ID로 참조 권장 (예: "REG-001 수정 필요")
- ID 상세: 페이지별 문서 (`docs/pages/*.md`)
- ID 요약: `docs/OVERVIEW.md` > 7. 기능 요구사항

## 문서 포맷 규칙

### 콘텐츠 작성
콘텐츠 테이블에 ID, 요소, 내용, 인터랙션을 함께 작성:

```markdown
**콘텐츠**
| ID | 요소 | 내용 | 인터랙션 |
|----|------|------|----------|
| - | 제목 | "텍스트" | - |
| XXX-001-a | CTA 버튼 | "버튼 텍스트" | 클릭 → 다음 화면 |

**테스트 시나리오**
- 정상 케이스 → 기대 결과
- 예외 케이스 → 기대 결과
```

**규칙:**
- 정적 요소는 ID에 `-` 표시
- 인터랙션 없는 요소는 인터랙션 컬럼에 `-` 표시
- `<details>` 태그는 **대량 콘텐츠 목록**에만 사용 (FAQ, 후기, 선택지 목록)

### 컴포넌트 ID 부여
- 인터랙션/액션이 있는 요소에 ID 부여
- **동적 데이터 표시 요소**에도 ID 부여 (테스트/분석 추적 목적)
- ID 형식: `섹션ID-알파벳` (예: LAND-002-a, REG-002-a)
- 대상: CTA 버튼, 폼 필드, 제출 버튼, 선택지, 공유 버튼, 아코디언, 네비게이션, 동적 카운터/그래프
- 제외: 정적 텍스트, 배지, 이미지, 정적 카드

### 페이지 문서 구조 (화면기획서)
페이지 문서(`docs/pages/*.md`)는 디자이너가 **이미지와 명세를 함께** 볼 수 있도록 구성:

```markdown
## 3. 화면별 기능 명세

### [화면명]

![화면명](../wireframes/labeled/화면명-labeled.png)

#### SECTION-001 섹션명
**주요 기능** / **콘텐츠** (ID, 요소, 내용, 인터랙션) / **테스트 시나리오**

#### SECTION-001-a 컴포넌트명
...

---

### [다음 화면명]
...
```

- 각 화면의 와이어프레임 이미지 바로 아래에 해당 명세 배치
- 화면에 종속되지 않는 로직/데이터 명세는 **"추가 기능 명세"** 섹션으로 분리
- 문서 간 참조 시 ID 링크 사용 (예: `[test.md](./test.md) > TEST-004 참조`)

## 명세 → 티켓 자동화

명세 문서 변경이 Jira 티켓으로 변환되는 전체 플로우:

```
명세 수정 → 커밋 → PR → PR 분석 → 티켓 자동 생성
```

### 1. 커밋 (`/commit`)

명세 변경 시 기능 코드별로 분할 커밋한다.

```
feat(register): 소셜 로그인 옵션 추가

[SPEC] REG-002-d
[TEAM] Frontend
```

- 1커밋 = 1 `[SPEC]` + 1 `[TEAM]`
- 여러 기능 코드 변경 시 분할 커밋
- 여러 팀 영향 시 팀별 별도 커밋
- 명세 외 작업(docs, chore)은 `[SPEC]`/`[TEAM]` 없이 커밋
- 상세: `.claude/skills/commit/SKILL.md`

### 2. PR 생성 (`/pull-request`)

커밋들을 묶어 PR을 생성한다. 변경된 사항에는 `[SPEC]` 커밋만 나열하며, 커밋 body를 그대로 옮겨 적는다.

```
[Spec] update-register-flow: 등록 플로우 개선
```

각 항목은 SPEC 코드별 헤더 + 메타정보 + 커밋 body 형식:

```
### REG-002-b
- 페이지: register
- 변경유형: feat
- 팀: Frontend

[커밋 body 전체]
```

- 상세: `.claude/skills/pull-request/SKILL.md`

### 3. PR 분석 → 티켓 생성

PR이 main에 merge되면 자동으로 Jira 티켓이 생성된다.

```
커밋 [SPEC]/[TEAM] 추출 → 변경 유형 분류 → 팀 할당 → 규모 산정(1/2/4/8/16) → 티켓 생성
```

- 1커밋 = 1티켓 (기본)
- 분석 규칙: `.claude/rules/pr-to-ticket.md`
- 티켓 형식: `.claude/rules/jira-ticket-template.md`

## 와이어프레임 관리

### 폴더 구조
```
docs/wireframes/
├── Wireframe.pen          # 원본 Penpot 파일
├── original/              # 라벨 없는 원본 PNG
└── labeled/               # 라벨 추가된 PNG (문서에서 참조)
```

### 라벨 자동 생성
```bash
node scripts/label-wireframes.js
```
- 원본 PNG에 ID 라벨을 오버레이하여 labeled/ 폴더에 저장
- 라벨 위치 수정: `scripts/label-positions.json`

### 라벨 위치 편집기
브라우저에서 라벨을 드래그하여 위치 조정:
```bash
open scripts/label-editor.html   # 브라우저에서 열기
```
1. 사이드바에서 와이어프레임 선택
2. 라벨을 드래그하여 위치 조정
3. 하단 JSON 복사 → `label-positions.json`에 붙여넣기
4. `node scripts/label-wireframes.js` 실행하여 이미지 재생성

### 라벨 색상
- 🔵 섹션 ID: #3B82F6 (예: LAND-001)
- 🔴 컴포넌트 ID: #EF4444 (예: LAND-001-a)

### 문서 참조
- 페이지 문서(`docs/pages/*.md`)에서는 **labeled/** 이미지 사용
- 예: `![Landing](../wireframes/labeled/Landing%20Page%20-%20Desktop-labeled.png)`
