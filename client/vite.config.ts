import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
  server: {
    port: 8000,
    proxy: {
      '/api': 'https://ai-test-maker-server.vercel.app',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),

    },
  },
})
