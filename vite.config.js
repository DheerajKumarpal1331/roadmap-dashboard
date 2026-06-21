import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to '/your-repo-name/' when deploying to GitHub Pages project site
// Leave as '/' for a user/org site (username.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: { port: 5174 },
})
