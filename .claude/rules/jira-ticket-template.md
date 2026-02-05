# Jira 티켓 템플릿

## 자동 생성 티켓 형식

PR이 main으로 merge되면 아래 형식으로 Jira 티켓이 자동 생성된다.

> 분석 규칙: [pr-to-ticket.md](./pr-to-ticket.md) 참조

---

## 필드 정의

### 필수 필드

| 필드 | 설명 | 예시 |
|------|------|------|
| **제목** | `[팀] 기능코드 변경요약` | `[FE] LAND-002 Hero 섹션 CTA 인터랙션 추가` |
| **명세 코드** | 변경된 기능 ID | `LAND-002-a` |
| **변경 유형** | new / update / remove | `update` |
| **팀** | Frontend / Backend / Design | `Frontend` |
| **작업 규모** | 1 / 2 / 4 / 8 / 16 | `4` |

### 선택 필드

| 필드 | 설명 | 예시 |
|------|------|------|
| **Blocker** | 선행 작업이 필요한 경우 | `Design 와이어프레임 완료 필요` |
| **Epic** | PR 프로젝트명 | `update-register-flow` |
| **Label** | 분류 태그 | `spec/update-register-flow` |

---

## 티켓 본문 템플릿

```markdown
## 명세 코드
`CODE-NNN` (또는 `CODE-NNN-x`)

## 변경 유형
new | update | remove

## 변경점

### Before (update/remove인 경우)
> 이전 명세 내용 요약

### After (new/update인 경우)
> 변경된 명세 내용 요약

## 참고 사항
- 명세 문서: `docs/pages/<page>.md` > CODE-NNN 섹션
- PR: #<PR번호>

## 작업 규모
**N** (1 / 2 / 4 / 8 / 16)

## Acceptance Criteria
- [ ] 명세에 정의된 콘텐츠가 반영됨
- [ ] 명세에 정의된 인터랙션이 동작함
- [ ] 테스트 시나리오 통과
```

---

## 실제 예시

### 예시 1: 프론트엔드 - 기존 기능 수정

**제목:** `[FE] LAND-009-b 등록 폼 필드 변경`

```markdown
## 명세 코드
`LAND-009-b`

## 변경 유형
update

## 변경점

### Before
| ID | 요소 | 내용 | 인터랙션 |
|----|------|------|----------|
| LAND-009-b | 폼 | 연락처 + 동의 (이메일, 동의) | 입력 → 버튼 활성화 |

### After
| ID | 요소 | 내용 | 인터랙션 |
|----|------|------|----------|
| LAND-009-b | 폼 | 연락처 + 동의 (이메일, 휴대폰번호, 동의) | 입력 → 버튼 활성화 |

## 참고 사항
- 명세 문서: `docs/pages/landing.md` > LAND-009 섹션
- PR: #42
- 휴대폰번호는 선택 필드 (등록 폼 상세: `docs/pages/register.md` > REG-002)

## 작업 규모
**2**

## Acceptance Criteria
- [ ] 휴대폰번호 입력 필드가 이메일 아래에 추가됨
- [ ] 휴대폰번호 미입력 시에도 등록 가능
- [ ] 테스트 시나리오 통과
```

---

### 예시 2: 백엔드 - 신규 기능

**제목:** `[BE] REG-006 테스트 데이터 연결 API`

```markdown
## 명세 코드
`REG-006`

## 변경 유형
new

## 변경점

### After
테스트 완료 후 등록 시 테스트 데이터를 등록 정보와 연결하여 저장

연결 데이터:
- 수면 고민 선택 항목
- ISI 점수/등급
- 조건부 후속 질문 응답
- 추가 정보 (ISI 8점+ 사용자)

## 참고 사항
- 명세 문서: `docs/pages/register.md` > REG-006 섹션
- 테스트 데이터 상세: `docs/pages/test.md` > TEST-010
- PR: #45

## 작업 규모
**4**

## Acceptance Criteria
- [ ] 등록 API가 테스트 session ID를 받아 데이터 연결
- [ ] 연결된 데이터가 정상 조회됨
- [ ] 테스트 시나리오 통과
```

---

### 예시 3: 디자인 - 와이어프레임 업데이트

**제목:** `[Design] LAND-007 후기 캐러셀 와이어프레임 업데이트`

```markdown
## 명세 코드
`LAND-007`

## 변경 유형
update

## 변경점

### Before
후기 카드 6개, 스와이프/자동 전환

### After
후기 카드 8개로 확대, 자동 전환 제거 (수동 스와이프만)

## 참고 사항
- 명세 문서: `docs/pages/landing.md` > LAND-007 섹션
- PR: #48

## 작업 규모
**2**

## Acceptance Criteria
- [ ] 와이어프레임에 후기 카드 8개 반영
- [ ] 자동 전환 인터랙션 제거 반영
```
