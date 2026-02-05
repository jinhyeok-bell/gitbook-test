# 개발환경 요구사항

## 1. 목적
SleepThera 개발을 위한 공통 개발환경 기준과 필수 도구를 정의한다. 백엔드는 Spring Boot와 AWS ECS/Aurora RDS를 사용하며, 프론트엔드는 React + Next.js + TypeScript를 사용한다.

## 2. 범위
- 백엔드: Spring Boot 서비스 개발 및 ECS 배포 준비
- 프론트엔드: Next.js 기반 웹 앱 개발
- 인프라: AWS ECS/ECR, Aurora RDS, IAM 접근 구성

## 3. 공통 요구사항
- OS: macOS 또는 Linux 권장
- Git: 최신 안정 버전
- Docker: 로컬 서비스 실행/테스트용
- 문서/버전 기준:
  - 백엔드 버전 기준: `build.gradle` 또는 `pom.xml`
  - 프론트엔드 버전 기준: `package.json`, `.nvmrc` 또는 `.tool-versions`

## 4. 백엔드 요구사항 (Spring Boot + AWS ECS + Aurora RDS)
### 4.1 개발 도구
- 언어: Kotlin
- JVM: 프로젝트에서 지정한 LTS 버전 사용
- 빌드 도구: Gradle 또는 Maven (프로젝트 설정 기준)
- IDE: IntelliJ IDEA 권장 (또는 VS Code)

### 4.2 인프라 및 배포
- AWS CLI: 계정 인증 및 리소스 접근
- ECS/ECR: 컨테이너 빌드 및 배포용
- Aurora RDS (PostgreSQL): 애플리케이션 데이터베이스
- IAM 권한: ECS, ECR, RDS, CloudWatch Logs 접근 권한

### 4.3 로컬 개발 권장 사항
- Docker Compose로 로컬 DB/의존 서비스 구동
- 환경 변수 관리: `.env` 또는 AWS SSM/Secrets Manager 연동

## 5. 프론트엔드 요구사항 (React + Next.js + TypeScript)
### 5.1 개발 도구
- Node.js: 최신 LTS 버전
- 패키지 매니저: `npm`, `yarn`, `pnpm` 중 프로젝트 기준
- TypeScript: 프로젝트 설정 기준

### 5.2 품질 도구
- Lint/Format: `eslint`, `prettier` (프로젝트 설정 기준)

## 6. 접근/계정
- AWS 계정 및 IAM 사용자/역할
- 리포지토리 접근 권한

## 7. 배포
- GitHub Actions 사용
