import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/scalar_website/", // wichtig für GitHub Pages!
  plugins: [react()],
});
