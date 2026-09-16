import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ← 추가
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
