import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [
    react(),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
});