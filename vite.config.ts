import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署路径：https://<user>.github.io/aigc-portfolio/
  base: '/aigc-portfolio/',
})
