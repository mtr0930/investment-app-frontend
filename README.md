# AI Investment Diary (Frontend)

AI 기반의 해외 주식 투자 일기 앱 프론트엔드 프로젝트입니다. React Native(Expo)를 사용하여 개발되었습니다.

## 시작하기

### 사전 준비 사항

- [Node.js](https://nodejs.org/) (v18 이상 권장)
- npm 혹은 yarn
- 모바일 기기에 [Expo Go](https://expo.dev/go) 앱 설치 (테스트용)

### 설치

```bash
# 의존성 패키지 설치
npm install
```

## 실행 방법

### Expo 개발 서버 시작

```bash
npm start
```

명령어 실행 후 터미널에 나타나는 QR 코드를 **Expo Go** 앱으로 스캔하여 앱을 실행할 수 있습니다.

### 플랫폼별 직접 실행

```bash
# iOS 시뮬레이터 (macOS 전용)
npm run ios

# Android 에뮬레이터
npm run android

# 웹 브라우저
npm run web
```

---

## 환경 설정 (Backend API 연결)

로컬에서 백엔드 서버와 통신하기 위해 PC의 IP 주소를 설정해야 합니다.

1. `src/config/index.ts` 파일을 엽니다.
2. `HOST` 변수를 현재 작업 중인 PC의 로컬 IP 주소로 수정합니다.

```typescript
// src/config/index.ts
const HOST = '192.168.x.x'; // 본인의 PC IP 주소로 변경
```

> [!TIP]
> Mac의 경우 터미널에서 `ipconfig getifaddr en0` 명령어로 IP를 확인할 수 있습니다.

## 샘플 페이지 화면
<img width="3221" height="1928" alt="image" src="https://github.com/user-attachments/assets/cc0a342b-2cbc-4fda-938e-05799829778c" />

