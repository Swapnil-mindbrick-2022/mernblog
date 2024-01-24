// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Update this to match your backend server
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
