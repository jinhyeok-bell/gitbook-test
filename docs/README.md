# SleepThera 랜딩 페이지 PRD (Product Requirements Document)

## 1. 개요 (Overview)

### 1.1 제품 소개
SleepThera(슬립테라)는 벨 테라퓨틱스가 개발한 **뇌과학 기반 불면증 디지털 치료제(DTx)**입니다. 생체신호를 기반으로 환자 개인에게 최적화된 디지털 자극을 생성하여 불면증을 치료하는 혁신적인 의료기기입니다.

### 1.2 회사 미션
> **"슬립테라는 사용자가 밤을 두려워하지 않게 만듭니다."**

- **도우미(Helper)**: 사용자의 수면 여정을 함께하는 파트너
- **내적 만족감(Intrinsic Goal of Satisfaction)**: 사용자와 의미 있는 상호작용 제공
- **신뢰(Reliable)**: 검증된 기술과 임상 결과를 바탕으로 한 신뢰 경험 전달

### 1.3 주요 성과 및 신뢰 지표
- 🏆 **2025년 2월**: EU 의료기기 인증 'CE MDR' 획득
- 🏆 **2025년 6월**: 식품의약품안전처 **혁신의료기기(첨단기술군)** 지정
- 🎓 **연구 파트너십**: 서울대학병원 신경과, 이화여대 음악치료학과
- 🌍 **SLEEP 2025 학술대회** 발표 (HCP Live 선정 '주목할 만한 7개 연구')
- 💰 **투자 유치**: 퓨처플레이, HGI 시드 투자

---

## 2. 프로젝트 목표 (Goals)

### 2.1 비즈니스 목표
| 목표 | 설명 | 우선순위 |
|------|------|----------|
| **Waiting List 구축** | 앱 체험단 운영을 위한 잠재 사용자 모집 | P0 |
| **타겟 사용자 확보** | ISI 점수 15점 이상의 중등도~심각한 불면증 사용자 집중 | P0 |
| **브랜드 신뢰도 구축** | 디지털 치료제로서의 전문성과 신뢰감 전달 | P0 |
| **SEO 최적화** | 불면증 관련 검색에서 상위 노출 | P1 |

### 2.2 사용자 목표
- 자신의 불면증 심각도를 **객관적으로 파악**할 수 있다
- SleepThera가 **신뢰할 수 있는 솔루션**임을 확인할 수 있다
- 쉽게 **Waiting List에 등록**하여 체험 기회를 얻을 수 있다

### 2.3 핵심 성과 지표 (KPIs)
| KPI | 목표치 | 측정 방법 |
|-----|--------|-----------|
| Waiting List 등록 수 | 1,000명+ (3개월) | 등록 폼 제출 수 |
| ISI 테스트 완료율 | 70%+ | 테스트 시작 대비 완료 |
| 고위험군 등록 전환율 | 40%+ | ISI 15점 이상 중 등록 비율 |
| 페이지 체류 시간 | 3분+ | Analytics |
| 검색 유입 비율 | 30%+ | Organic Search Traffic |

---

## 3. 타겟 사용자 (Target Audience)

### 3.1 주요 타겟
**중등도~심각한 불면증을 겪고 있는 성인 (ISI 15점 이상)**

### 3.2 사용자 페르소나

#### 페르소나 1: 직장인 김수면 (32세, 여성)
- **상황**: 업무 스트레스로 인한 만성 불면, 수면제 의존 우려
- **Pain Point**: 약물 치료의 부작용이 걱정됨, 비약물적 대안 탐색 중
- **니즈**: 과학적으로 검증된 비약물 치료법

#### 페르소나 2: 중년 남성 박잠못 (48세, 남성)
- **상황**: 10년 넘게 불면증, 다양한 방법 시도했으나 효과 없음
- **Pain Point**: 더 이상 시도할 게 없다는 무력감
- **니즈**: 새로운 접근법, 전문가의 도움

#### 페르소나 3: 대학생 이밤새 (24세, 남성)
- **상황**: 수면 패턴 불규칙, 시험 기간 극심한 불면
- **Pain Point**: 병원 가기가 부담스러움
- **니즈**: 접근성 높은 디지털 솔루션

### 3.3 ISI 점수 기준
| 점수 범위 | 분류 | 타겟 여부 |
|-----------|------|-----------|
| 0-7점 | 불면증 없음 | ❌ 비타겟 |
| 8-14점 | 경계성 불면 | ⚠️ 잠재 타겟 |
| 15-21점 | **중등도 불면** | ✅ **핵심 타겟** |
| 22-28점 | **심각한 불면** | ✅ **핵심 타겟** |

---

## 4. 핵심 기능 요구사항 (Features)

### 4.1 ISI 불면증 심각도 테스트 [P0]

#### 기능 설명
사용자가 7개 문항에 응답하여 자신의 불면증 심각도를 확인할 수 있는 자가진단 도구

#### 상세 요구사항
```
- 7개 문항 (각 0-4점, 총 0-28점)
- 문항별 진행률 표시
- 결과 화면: 점수, 심각도 등급, 맞춤 메시지
- 결과에 따른 CTA 분기:
  - 15점 이상: "전문적인 도움이 필요합니다" → 강한 Waiting List 유도
  - 8-14점: "수면 개선의 여지가 있습니다" → 관심 유도
  - 0-7점: "현재 수면 상태가 양호합니다" → 정보 제공
```

#### ISI 7개 문항 (한국어)
1. 잠들기 어려운 정도
2. 수면 유지의 어려움 정도
3. 너무 일찍 깨는 문제
4. 현재 수면 패턴에 대한 만족도
5. 수면 문제가 낮 동안 기능에 미치는 영향
6. 수면 문제로 인한 삶의 질 저하 정도
7. 수면 문제에 대한 걱정/고민 정도

#### UI/UX 요구사항
- 한 화면에 한 문항씩 표시 (집중도 향상)
- 부드러운 전환 애니메이션
- 이전 문항으로 돌아가기 가능
- 모바일 최적화 필수

---

### 4.2 SEO 최적화 [P1]

#### 타겟 키워드
```
주요 키워드:
- 불면증 치료
- 불면증 테스트
- 불면증 자가진단
- 디지털 치료제 불면증
- 수면 장애 치료
- ISI 점수

롱테일 키워드:
- 불면증 심각도 테스트
- 불면증 치료 앱
- 약 없이 불면증 치료
- 인지행동치료 불면증
- 불면증 비약물 치료
```

#### 기술적 SEO 요구사항
```
- Semantic HTML 구조
- Meta tags (title, description, keywords)
- Open Graph / Twitter Card
- JSON-LD 구조화 데이터 (Organization, MedicalWebPage)
- 모바일 최적화 (Mobile-First)
- 페이지 속도 최적화 (Core Web Vitals)
- Sitemap.xml
- robots.txt
- Canonical URL
```

---

### 4.3 랜딩 페이지 콘텐츠 섹션 [P0]

#### 4.4.1 Hero 섹션
```
목적: 첫인상, 핵심 가치 전달
내용:
- 메인 헤드라인: "밤이 두렵지 않은 삶, SleepThera와 함께"
- 서브 헤드라인: 뇌과학 기반 불면증 디지털 치료제
- CTA 버튼: "내 불면증 테스트하기" / "Waiting List 등록"
- 신뢰 배지: CE 인증, 혁신의료기기, 서울대병원 연구
```

#### 4.4.2 신뢰 구축 섹션
```
목적: 디지털 치료제로서의 신뢰도 확보
내용:
- 인증 및 허가 현황 (CE MDR, 혁신의료기기)
- 연구 파트너십 (서울대병원, 이화여대)
- 언론 보도 로고 및 링크
- 학술 발표 실적 (SLEEP 2025)
- 투자 유치 현황
```

#### 4.4.3 문제 공감 섹션
```
목적: 사용자의 Pain Point에 공감
내용:
- 불면증으로 인한 일상의 어려움
- 기존 치료법의 한계 (약물 의존, 부작용)
- 통계 데이터 (국내 불면증 인구, 치료율 등)
```

#### 4.4.4 솔루션 소개 섹션
```
목적: SleepThera의 차별점 전달
내용:
- 작동 원리 (생체신호 기반 개인화 디지털 자극)
- 기존 치료 대비 장점
- 비약물적 접근의 안전성
- 앱 스크린샷 / 목업 이미지
```

#### 4.4.5 ISI 테스트 섹션
```
목적: 사용자 참여 유도, 리드 확보
내용:
- 테스트 소개 ("1분 안에 확인하는 내 불면증 심각도")
- 테스트 시작 CTA
- 또는 인라인 테스트 위젯
```

#### 4.4.6 Waiting List 섹션
```
목적: 최종 전환
내용:
- 등록 혜택 안내 (출시 알림, 체험단 우선권, 할인)
- 등록 폼
- 개인정보 처리 동의
```

#### 4.4.7 FAQ 섹션
```
목적: 불안 해소, 신뢰 강화
예상 질문:
- SleepThera는 어떤 원리로 작동하나요?
- 기존 수면제와 어떻게 다른가요?
- 부작용은 없나요?
- 언제 출시되나요?
- 비용은 얼마인가요?
- 의사 처방이 필요한가요?
```

#### 4.4.8 Footer
```
내용:
- 회사 정보 (벨 테라퓨틱스)
- 연락처
- 개인정보처리방침
- 이용약관
- SNS 링크
```

---

## 5. 디자인 요구사항 (Design)

### 5.1 디자인 원칙
1. **신뢰감 (Trust)**: 의료기기로서의 전문성과 신뢰 전달
2. **안정감 (Calm)**: 불면증 사용자를 위한 차분하고 편안한 분위기
3. **명확성 (Clarity)**: 명확한 정보 전달과 직관적인 사용자 흐름

### 5.2 컬러 팔레트 제안
```
Primary: Deep Navy (#1a365d) - 신뢰, 전문성
Secondary: Soft Purple (#6b46c1) - 수면, 밤
Accent: Warm Gold (#d69e2e) - 희망, 개선
Background: Off-White (#f7fafc) - 깨끗함, 안정
Text: Dark Gray (#2d3748) - 가독성
```

### 5.3 타이포그래피
```
Heading: Pretendard Bold
Body: Pretendard Regular
Accent: 강조용 세리프 폰트 (선택적)
```

### 5.4 UI 컴포넌트
- 부드러운 모서리 (border-radius: 8-16px)
- 미묘한 그림자로 깊이감 표현
- 충분한 여백 (breathable layout)
- 부드러운 트랜지션 및 애니메이션

---

## 6. 기술 요구사항 (Technical)

### 6.1 기술 스택 제안
```
Frontend:
- Framework: Next.js 14 (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion
- Form: React Hook Form + Zod

Backend/Storage:
- Supabase (Auth, Database, Storage)
- 또는 Firebase

Analytics:
- Google Analytics 4
- Mixpanel / Amplitude (선택적)

Deployment:
- Vercel

SEO:
- next-sitemap
- next-seo
```

### 6.2 성능 요구사항
```
- Lighthouse Score: 90+ (모든 카테고리)
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
```

### 6.3 브라우저 지원
```
- Chrome (최신 2버전)
- Safari (최신 2버전)
- Firefox (최신 2버전)
- Edge (최신 2버전)
- iOS Safari
- Android Chrome
```

---

## 7. 데이터베이스 스키마 (Database)

### 7.1 Waiting List 테이블
```sql
CREATE TABLE waiting_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  phone VARCHAR(20),
  isi_score INTEGER,
  isi_severity VARCHAR(20), -- 'none', 'subthreshold', 'moderate', 'severe'
  marketing_consent BOOLEAN DEFAULT false,
  privacy_consent BOOLEAN DEFAULT true,
  source VARCHAR(50), -- 'organic', 'social', 'ad', etc.
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 7.2 ISI Results 테이블 (선택적)
```sql
CREATE TABLE isi_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100),
  answers JSONB, -- 각 문항별 응답
  total_score INTEGER,
  severity VARCHAR(20),
  completed BOOLEAN DEFAULT false,
  waiting_list_id UUID REFERENCES waiting_list(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. 법적 요구사항 (Legal)

### 8.1 필수 문서
- 개인정보처리방침
- 이용약관
- 마케팅 수신 동의 문구

### 8.2 의료기기 관련 주의사항
```
⚠️ 랜딩 페이지에 명시해야 할 사항:
- "본 제품은 아직 국내 의료기기 허가를 받지 않았습니다"
- "ISI 테스트는 의학적 진단을 대체하지 않습니다"
- "정확한 진단은 전문의와 상담하세요"
```

### 8.3 개인정보 수집 동의
- 수집 항목 명시
- 수집 목적 명시
- 보유 기간 명시
- 제3자 제공 여부

---

## 9. 마일스톤 및 우선순위 (Roadmap)

### Phase 1: MVP (2주)
- [ ] 기본 랜딩 페이지 구조
- [ ] Hero 섹션 + 신뢰 구축 섹션
- [ ] ISI 테스트 기능
- [ ] Waiting List 등록 폼
- [ ] 기본 SEO 설정
- [ ] 모바일 반응형

### Phase 2: Enhancement (1주)
- [ ] 애니메이션 및 인터랙션 추가
- [ ] FAQ 섹션
- [ ] 소셜 공유 기능
- [ ] Google Analytics 연동
- [ ] 이메일 자동 발송

### Phase 3: Optimization (1주)
- [ ] 성능 최적화
- [ ] A/B 테스트 설정
- [ ] 고급 SEO (구조화 데이터)
- [ ] UTM 파라미터 추적

---

## 10. 성공 측정 (Success Metrics)

### 10.1 단기 지표 (1-3개월)
| 지표 | 목표 | 측정 도구 |
|------|------|-----------|
| Waiting List 등록 수 | 1,000명 | Database |
| ISI 테스트 완료율 | 70% | Analytics |
| 페이지 체류 시간 | 3분 | GA4 |
| 이탈률 | < 40% | GA4 |

### 10.2 장기 지표 (3-6개월)
| 지표 | 목표 | 측정 도구 |
|------|------|-----------|
| 검색 유입 비율 | 30% | GA4 |
| 체험단 전환율 | 20% | 내부 데이터 |
| NPS (등록자 대상) | 40+ | 설문 |

---

## 11. 리스크 및 의존성 (Risks)

### 11.1 리스크
| 리스크 | 영향도 | 완화 방안 |
|--------|--------|-----------|
| 의료기기 관련 법적 이슈 | 높음 | 법무 검토, 주의 문구 명시 |
| 낮은 전환율 | 중간 | A/B 테스트, UX 개선 |
| 경쟁사 대비 신뢰도 부족 | 중간 | 연구/인증 강조 |

### 11.2 의존성
- 디자인 에셋 (앱 목업, 로고 등)
- 법무 검토 완료
- 인증서/허가서 이미지

---

## 12. 참고 자료 (References)

### 12.1 회사 및 제품 정보
- [벨 테라퓨틱스 공식 웹사이트](https://www.belltherapeutics.com/)
- [벨 테라퓨틱스 뉴스](https://www.belltherapeutics.com/ko/news)
- [THE VC - 벨테라퓨틱스 기업정보](https://thevc.kr/belltherapeutics)

### 12.2 언론 보도
- [서울경제 - 혁신의료기기 지정](https://www.sedaily.com/NewsView/2GU6ONDJ5P)
- [전자신문 - 혁신의료기기 지정](https://www.etnews.com/20250623000014)
- [머니투데이 - EU 인증](https://www.mt.co.kr/future/2025/02/26/2025022609254469739)
- [플래텀 - 시드 투자 유치](https://platum.kr/archives/213997)

### 12.3 ISI 참고자료
- [Medscape - ISI Calculator](https://reference.medscape.com/calculator/820/insomnia-severity-index-isi)
- [PMC - ISI Psychometric Indicators](https://pmc.ncbi.nlm.nih.gov/articles/PMC3079939/)

---

## 변경 이력 (Changelog)

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0 | 2026-02-02 | Claude | 초안 작성 |