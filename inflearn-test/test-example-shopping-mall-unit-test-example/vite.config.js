import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    globals: true, // vitest옵션 전역사용 가능
    environment: 'jsdom', // 브라우저와 다르게 node.js에서는 dom이 없으므로 필요함
    setupFiles: './src/utils/test/setupTests.js', // 필요한 설정들을 해당 폴더 참고
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
