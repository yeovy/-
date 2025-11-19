import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리에서 환경 변수 로드
  const env = loadEnv(mode, '.', '');

  // 1순위: Vercel 등 환경 변수 설정
  // 2순위: 제공해주신 API Key (하드코딩)
  // 이렇게 하면 환경 변수 설정이 없어도 자동으로 이 키가 사용됩니다.
  const apiKey = env.API_KEY || "AIzaSyDs9AquCy4SVeQpwHF_GH0T9j4OEQsyXx8";

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
    },
    define: {
      // 클라이언트 코드에서 process.env.API_KEY로 접근 가능하게 값을 치환
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});