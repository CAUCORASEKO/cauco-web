import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        fi: "index-fi.html",
        sv: "index-sv.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
