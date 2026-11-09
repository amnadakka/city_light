import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Production (GitHub Pages project site): https://<user>.github.io/CityLight/
// Local dev uses `/` for simpler URLs.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/CityLight/' : '/',
}))
