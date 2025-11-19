import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Fixed: process.cwd() caused a type error, using '.' instead.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
    },
    define: {
      // This enables process.env.API_KEY to be used in the client-side code
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});