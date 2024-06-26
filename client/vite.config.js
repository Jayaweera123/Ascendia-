// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   server: {
//     port:5000
//   }
// })

// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5000,
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       // Add alias for global shim
//       'global': 'src/shim/global.js',
//     },
//   },
//   define: {
//     // Ensure the global object is defined
//     'global': {},
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/websocket': {
        target: 'http://localhost:8080', // Backend server
        ws: true, // Enable WebSocket proxying
      },
    },
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




