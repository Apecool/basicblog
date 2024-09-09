import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("../certificates/localhost-key.pem"),
      cert: fs.readFileSync("../certificates/localhost.pem"),
    },
    proxy: {
      '/api': {
        target: 'https://localhost:3000',
        changeOrigin: true,
        secure: false, // Set to false if using self-signed certificates
      },
    }
  },
  plugins: [react()],
})
