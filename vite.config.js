import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import activityEditor from './tools/activity-editor-plugin.mjs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), activityEditor()],
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
})
