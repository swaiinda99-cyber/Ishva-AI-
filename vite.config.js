import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js into its own vendor chunk for better caching
          'vendor-three': ['three']
        }
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  }
});
