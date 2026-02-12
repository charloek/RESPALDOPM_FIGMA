import fs from 'fs'
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Toggle HTTPS by setting VITE_HTTPS=true and adding certs/localhost+lan.key/.pem
    https:
      process.env.VITE_HTTPS === 'true'
        ? {
            key: fs.readFileSync('certs/localhost+lan.key'),
            cert: fs.readFileSync('certs/localhost+lan.pem'),
          }
        : false,
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})
