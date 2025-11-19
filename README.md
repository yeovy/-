# BIZINTEL - 부산상공회의소 기업애로 AI 인텔리전스

부산 지역 기업들의 애로사항을 입력받아 AI(Gemini 2.5)가 법령 및 정책을 분석하고, 정부 제출용 공식 건의서를 자동으로 생성해주는 시스템입니다.

## 🚀 주요 기능

- **AI 자동 분석**: 자유 형식의 민원을 입력하면 Gemini AI가 실시간으로 분석
- **정책 건의서 생성**: 현황, 문제점, 개선방안, 관련 법령 등 6단계 표준 서식 자동 작성
- **법령 매칭**: 관련된 대한민국 법령 및 소관 부처 자동 제안
- **PDF/인쇄**: 작성된 보고서를 즉시 인쇄하거나 PDF로 저장 가능

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI**: Google Gemini API (gemini-2.5-flash)
- **Deployment**: Vercel

## 📦 설치 및 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/your-username/bizintel-busan.git
cd bizintel-busan
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

## 🌐 배포 방법 (Vercel)

1. 이 저장소를 본인의 GitHub로 Fork 또는 Push 합니다.
2. [Vercel](https://vercel.com)에 접속하여 `New Project`를 생성합니다.
3. GitHub 저장소를 연결합니다.
4. **Environment Variables** 설정에 다음을 추가합니다:
   - Key: `API_KEY`
   - Value: `(Google AI Studio에서 발급받은 Gemini API Key)`
5. `Deploy` 버튼을 누르면 배포가 완료됩니다.
