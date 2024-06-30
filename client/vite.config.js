
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add alias for global shim
      'global': 'src/shim/global.js',
    },
  },
  define: {
    // Ensure the global object is defined
    'global': {},
  },
});
