import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/solved": {
        target: "https://solved.ac",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/solved/, ""),
      },
    },
  },
});