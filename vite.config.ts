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
        antuMagallanes: "antu-magallanes.html",
        antuMagallanesEn: "antu-magallanes-en.html",
        antuMagallanesFi: "antu-magallanes-fi.html",
        antuMagallanesZh: "antu-magallanes-zh.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
