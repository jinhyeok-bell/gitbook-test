# SleepThera 랜딩 페이지 Jira 티켓

## Epic: SleepThera 랜딩 페이지 MVP 개발

---

## Phase 1: MVP (P0)

### 🎨 디자이너 티켓

#### SCRUM-1: [Design] 랜딩 페이지 전체 디자인 시스템 구축
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - 컬러 팔레트 정의 (Primary: #1a365d, Secondary: #6b46c1, Accent: #d69e2e)
  - 타이포그래피 설정 (Pretendard Bold/Regular)
  - 버튼, 입력 필드, 카드 등 UI 컴포넌트 스타일 가이드
  - 반응형 브레이크포인트 (Mobile: 320-767px, Tablet: 768-1023px, Desktop: 1024px+)
- **인수 조건**:
  - [ ] Figma 디자인 시스템 파일 완성
  - [ ] 컴포넌트 라이브러리 정의

---

#### SCRUM-2: [Design] Hero 섹션 디자인
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - 메인 헤드라인: "밤이 두렵지 않은 삶, SleepThera와 함께"
  - 서브 헤드라인: 뇌과학 기반 불면증 디지털 치료제
  - CTA 버튼 디자인: "내 불면증 테스트하기" / "Waiting List 등록"
  - 신뢰 배지 배치: CE 인증, 혁신의료기기, 서울대병원 연구
  - 데스크톱/모바일 반응형 레이아웃
- **인수 조건**:
  - [ ] Desktop/Tablet/Mobile 디자인 완성
  - [ ] 인터랙션 상태 정의 (hover, active)

---

#### SCRUM-3: [Design] 신뢰 구축 섹션 디자인
- **유형**: Task
- **우선순위**: High
- **설명**:
  - 인증 및 허가 현황 (CE MDR, 혁신의료기기) 표시
  - 연구 파트너십 로고 (서울대병원, 이화여대)
  - 언론 보도 로고 및 링크
  - 투자 유치 현황 표시
- **인수 조건**:
  - [ ] 인증 배지/로고 디자인
  - [ ] 섹션 레이아웃 완성

---

#### SCRUM-4: [Design] 문제 공감 섹션 디자인
- **유형**: Task
- **우선순위**: High
- **설명**:
  - 불면증으로 인한 일상의 어려움 시각화
  - 기존 치료법의 한계 (약물 의존, 부작용) 표현
  - 통계 데이터 인포그래픽
- **인수 조건**:
  - [ ] 공감을 유도하는 비주얼 디자인
  - [ ] 통계 인포그래픽

---

#### SCRUM-5: [Design] 솔루션 소개 섹션 디자인
- **유형**: Task
- **우선순위**: High
- **설명**:
  - SleepThera 작동 원리 다이어그램
  - 기존 치료 대비 장점 비교
  - 앱 목업 이미지 배치
- **인수 조건**:
  - [ ] 작동 원리 인포그래픽
  - [ ] 앱 목업 디자인

---

#### SCRUM-6: [Design] ISI 테스트 UI 디자인
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - 한 화면에 한 문항씩 표시
  - 진행률 표시 바
  - 선택 옵션 (0-4점) UI
  - 결과 화면 디자인 (점수별 차등)
    - 15점 이상: 경고 스타일 + 강한 CTA
    - 8-14점: 권유 스타일
    - 0-7점: 긍정 스타일
  - 이전/다음 버튼 및 애니메이션
- **인수 조건**:
  - [ ] 7개 문항 화면 디자인
  - [ ] 4가지 결과 화면 디자인
  - [ ] 전환 애니메이션 정의

---

#### SCRUM-7: [Design] Waiting List 등록 폼 디자인
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - 이메일 (필수), 이름 (선택), 전화번호 (선택) 입력 필드
  - 마케팅 수신 동의 체크박스
  - 개인정보 처리 동의 체크박스
  - 등록 완료 페이지
  - 혜택 안내 (출시 알림, 체험단 우선권, 할인)
- **인수 조건**:
  - [ ] 등록 폼 디자인
  - [ ] 성공/에러 상태 디자인
  - [ ] 완료 페이지 디자인

---

#### SCRUM-8: [Design] Footer 디자인
- **유형**: Task
- **우선순위**: Medium
- **설명**:
  - 회사 정보 (벨 테라퓨틱스)
  - 연락처, 개인정보처리방침, 이용약관 링크
  - SNS 링크
- **인수 조건**:
  - [ ] Footer 레이아웃 완성

---

### 💻 FE 엔지니어 티켓

#### SCRUM-9: [FE] 프로젝트 초기 설정
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - Next.js 14 (App Router) 프로젝트 생성
  - Tailwind CSS 설정
  - Framer Motion 설치
  - React Hook Form + Zod 설치
  - ESLint, Prettier 설정
  - 폴더 구조 설정
- **인수 조건**:
  - [ ] 프로젝트 정상 빌드
  - [ ] 개발 서버 실행 확인

---

#### SCRUM-10: [FE] 공통 컴포넌트 개발
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - Button 컴포넌트 (Primary, Secondary, Ghost)
  - Input 컴포넌트 (Text, Email, Phone)
  - Checkbox 컴포넌트
  - ProgressBar 컴포넌트
  - Card 컴포넌트
  - Badge 컴포넌트 (인증 배지용)
- **인수 조건**:
  - [ ] 디자인 시스템 기반 컴포넌트 완성
  - [ ] 반응형 지원

---

#### SCRUM-11: [FE] Hero 섹션 구현
- **유형**: Task
- **우선순위**: Highest
- **의존성**: SCRUM-2, SCRUM-10
- **설명**:
  - 헤드라인, 서브헤드라인 배치
  - CTA 버튼 구현
  - 신뢰 배지 컴포넌트
  - 반응형 레이아웃
  - 스크롤 애니메이션 (Framer Motion)
- **인수 조건**:
  - [ ] Desktop/Tablet/Mobile 레이아웃 구현
  - [ ] 애니메이션 동작 확인

---

#### SCRUM-12: [FE] 신뢰 구축 섹션 구현
- **유형**: Task
- **우선순위**: High
- **의존성**: SCRUM-3
- **설명**:
  - 인증/허가 배지 표시
  - 파트너 로고 그리드
  - 언론 보도 링크
- **인수 조건**:
  - [ ] 섹션 구현 완료
  - [ ] 링크 동작 확인

---

#### SCRUM-13: [FE] 문제 공감 섹션 구현
- **유형**: Task
- **우선순위**: High
- **의존성**: SCRUM-4
- **설명**:
  - 공감 콘텐츠 배치
  - 통계 인포그래픽 애니메이션
- **인수 조건**:
  - [ ] 섹션 구현 완료

---

#### SCRUM-14: [FE] 솔루션 소개 섹션 구현
- **유형**: Task
- **우선순위**: High
- **의존성**: SCRUM-5
- **설명**:
  - 작동 원리 다이어그램
  - 장점 비교 카드
  - 앱 목업 이미지
- **인수 조건**:
  - [ ] 섹션 구현 완료

---

#### SCRUM-15: [FE] ISI 테스트 기능 구현
- **유형**: Story
- **우선순위**: Highest
- **의존성**: SCRUM-6
- **설명**:
  - 7개 문항 스텝 폼 구현
  - 각 문항 0-4점 선택 옵션
  - 진행률 표시
  - 이전/다음 네비게이션
  - 부드러운 전환 애니메이션
  - 점수 계산 로직
  - 결과 화면 (점수별 분기)
    - 0-7점: 불면증 없음
    - 8-14점: 경계성 불면
    - 15-21점: 중등도 불면
    - 22-28점: 심각한 불면
  - 결과에 따른 CTA 분기
  - 로컬 스토리지에 결과 임시 저장
- **인수 조건**:
  - [ ] 테스트 시작부터 완료까지 플로우 동작
  - [ ] 점수 계산 정확성 확인
  - [ ] 애니메이션 부드러움 확인
  - [ ] 모바일 최적화

---

#### SCRUM-16: [FE] Waiting List 등록 폼 구현
- **유형**: Story
- **우선순위**: Highest
- **의존성**: SCRUM-7, SCRUM-20
- **설명**:
  - React Hook Form + Zod 유효성 검사
  - 필드: 이메일(필수), 이름(선택), 전화번호(선택)
  - 체크박스: 마케팅 동의, 개인정보 처리 동의
  - ISI 점수 자동 연동 (테스트 완료 시)
  - API 연동 (POST /api/waiting-list)
  - 로딩, 성공, 에러 상태 처리
  - 등록 완료 페이지
- **인수 조건**:
  - [ ] 폼 유효성 검사 동작
  - [ ] API 연동 완료
  - [ ] 에러 핸들링

---

#### SCRUM-17: [FE] Footer 구현
- **유형**: Task
- **우선순위**: Medium
- **의존성**: SCRUM-8
- **설명**:
  - 회사 정보
  - 네비게이션 링크
  - SNS 아이콘 링크
- **인수 조건**:
  - [ ] Footer 구현 완료

---

#### SCRUM-18: [FE] 기본 SEO 설정
- **유형**: Task
- **우선순위**: High
- **설명**:
  - next-seo 설치 및 설정
  - Meta tags (title, description)
  - Open Graph / Twitter Card
  - robots.txt
  - sitemap.xml (next-sitemap)
  - Canonical URL
  - Semantic HTML 구조 적용
- **인수 조건**:
  - [ ] 메타 태그 확인
  - [ ] 소셜 미리보기 확인

---

#### SCRUM-19: [FE] 모바일 반응형 최적화
- **유형**: Task
- **우선순위**: High
- **설명**:
  - 모든 섹션 모바일 최적화
  - 터치 인터랙션 최적화
  - 폰트 사이즈 조정
  - 여백 조정
- **인수 조건**:
  - [ ] 320px ~ 767px 테스트 완료
  - [ ] 터치 타겟 44px 이상

---

### ⚙️ BE 엔지니어 티켓

#### SCRUM-20: [BE] Supabase 프로젝트 설정
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - Supabase 프로젝트 생성
  - 환경 변수 설정
  - Supabase Client 설정
- **인수 조건**:
  - [ ] Supabase 연결 확인

---

#### SCRUM-21: [BE] Waiting List 테이블 생성
- **유형**: Task
- **우선순위**: Highest
- **의존성**: SCRUM-20
- **설명**:
  ```sql
  CREATE TABLE waiting_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100),
    phone VARCHAR(20),
    isi_score INTEGER,
    isi_severity VARCHAR(20),
    marketing_consent BOOLEAN DEFAULT false,
    privacy_consent BOOLEAN DEFAULT true,
    source VARCHAR(50),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- **인수 조건**:
  - [ ] 테이블 생성 완료
  - [ ] RLS (Row Level Security) 정책 설정

---

#### SCRUM-22: [BE] ISI Results 테이블 생성
- **유형**: Task
- **우선순위**: High
- **의존성**: SCRUM-20
- **설명**:
  ```sql
  CREATE TABLE isi_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100),
    answers JSONB,
    total_score INTEGER,
    severity VARCHAR(20),
    completed BOOLEAN DEFAULT false,
    waiting_list_id UUID REFERENCES waiting_list(id),
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```
- **인수 조건**:
  - [ ] 테이블 생성 완료

---

#### SCRUM-23: [BE] Waiting List API 개발
- **유형**: Story
- **우선순위**: Highest
- **의존성**: SCRUM-21
- **설명**:
  - POST /api/waiting-list
    - 이메일 중복 체크
    - 데이터 유효성 검사
    - DB 저장
    - 성공/에러 응답
  - 입력 데이터:
    - email (필수)
    - name (선택)
    - phone (선택)
    - isi_score (선택)
    - isi_severity (선택)
    - marketing_consent (필수)
    - privacy_consent (필수)
    - utm_source, utm_medium, utm_campaign (선택)
- **인수 조건**:
  - [ ] API 정상 동작
  - [ ] 중복 이메일 처리
  - [ ] 에러 핸들링

---

#### SCRUM-24: [BE] ISI 결과 저장 API 개발
- **유형**: Task
- **우선순위**: High
- **의존성**: SCRUM-22
- **설명**:
  - POST /api/isi-results
    - 세션 ID 생성/관리
    - 답변 저장
    - 점수 계산
    - 심각도 분류
- **인수 조건**:
  - [ ] API 정상 동작
  - [ ] 점수 계산 정확성

---

#### SCRUM-25: [BE] 환경 변수 및 보안 설정
- **유형**: Task
- **우선순위**: High
- **설명**:
  - 환경 변수 관리 (.env.local, .env.production)
  - API Rate Limiting
  - CORS 설정
  - 입력값 Sanitization
- **인수 조건**:
  - [ ] 보안 설정 완료
  - [ ] 환경별 설정 분리

---

## Phase 2: Enhancement (P1)

#### SCRUM-26: [Design] FAQ 섹션 디자인
- **유형**: Task
- **우선순위**: Medium
- **설명**:
  - 아코디언 스타일 FAQ
  - 예상 질문 6개 디자인
- **인수 조건**:
  - [ ] FAQ 섹션 디자인 완료

---

#### SCRUM-27: [FE] FAQ 섹션 구현
- **유형**: Task
- **우선순위**: Medium
- **의존성**: SCRUM-26
- **설명**:
  - 아코디언 컴포넌트
  - 애니메이션 효과
- **인수 조건**:
  - [ ] FAQ 섹션 구현 완료

---

#### SCRUM-28: [FE] 소셜 공유 기능
- **유형**: Task
- **우선순위**: Medium
- **설명**:
  - 카카오톡, 페이스북, 트위터 공유 버튼
  - ISI 테스트 결과 공유
- **인수 조건**:
  - [ ] 공유 기능 동작 확인

---

#### SCRUM-29: [FE] Google Analytics 4 연동
- **유형**: Task
- **우선순위**: High
- **설명**:
  - GA4 설치 및 설정
  - 페이지 조회 트래킹
  - 이벤트 트래킹 (테스트 시작, 완료, 등록)
  - 전환 목표 설정
- **인수 조건**:
  - [ ] GA4 데이터 수집 확인
  - [ ] 이벤트 트래킹 확인

---

#### SCRUM-30: [BE] 확인 이메일 자동 발송
- **유형**: Task
- **우선순위**: Medium
- **설명**:
  - 이메일 서비스 연동 (Resend 또는 SendGrid)
  - 등록 확인 이메일 템플릿
  - 자동 발송 로직
- **인수 조건**:
  - [ ] 이메일 발송 확인

---

## Phase 3: Optimization (P2)

#### SCRUM-31: [FE] 성능 최적화
- **유형**: Task
- **우선순위**: High
- **설명**:
  - 이미지 최적화 (next/image)
  - 코드 스플리팅
  - Lazy Loading
  - Core Web Vitals 점수 개선
    - FCP < 1.5s
    - LCP < 2.5s
    - CLS < 0.1
    - FID < 100ms
- **인수 조건**:
  - [ ] Lighthouse 점수 90+

---

#### SCRUM-32: [FE] JSON-LD 구조화 데이터
- **유형**: Task
- **우선순위**: Medium
- **설명**:
  - Organization 스키마
  - MedicalWebPage 스키마
  - FAQPage 스키마
- **인수 조건**:
  - [ ] 구조화 데이터 검증 통과

---

#### SCRUM-33: [BE] UTM 파라미터 추적
- **유형**: Task
- **우선순위**: Medium
- **설명**:
  - URL의 UTM 파라미터 파싱
  - DB 저장 및 분석
- **인수 조건**:
  - [ ] UTM 데이터 수집 확인

---

## 법적 요구사항 (공통)

#### SCRUM-34: [Legal] 개인정보처리방침 작성
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - 수집 항목 명시
  - 수집 목적 명시
  - 보유 기간 명시
  - 제3자 제공 여부
- **인수 조건**:
  - [ ] 법무 검토 완료

---

#### SCRUM-35: [Legal] 이용약관 작성
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - 서비스 이용약관 작성
  - 면책조항 포함
- **인수 조건**:
  - [ ] 법무 검토 완료

---

#### SCRUM-36: [Legal] 의료기기 관련 면책 문구
- **유형**: Task
- **우선순위**: Highest
- **설명**:
  - "본 제품은 아직 국내 의료기기 허가를 받지 않았습니다"
  - "ISI 테스트는 의학적 진단을 대체하지 않습니다"
  - "정확한 진단은 전문의와 상담하세요"
- **인수 조건**:
  - [ ] 문구 확정 및 반영

---

## 티켓 요약

| Phase | 디자이너 | FE | BE | 공통 | 총계 |
|-------|---------|----|----|------|------|
| Phase 1 (MVP) | 8 | 11 | 6 | - | 25 |
| Phase 2 | 1 | 3 | 1 | - | 5 |
| Phase 3 | - | 2 | 1 | - | 3 |
| Legal | - | - | - | 3 | 3 |
| **총계** | **9** | **16** | **8** | **3** | **36** |
