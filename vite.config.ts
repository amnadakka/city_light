import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Production (GitHub Pages project site): https://amnadakka.github.io/city_light/
// Local dev uses `/` for simpler URLs.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/city_light/' : '/',
}))
