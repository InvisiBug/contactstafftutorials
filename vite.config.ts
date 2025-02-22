import { defineConfig } from 'vite'
import ssr from "vike/plugin";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),ssr()],
  ssr: {
    noExternal: ["styled-components", "@emotion/*"],
  },
})
