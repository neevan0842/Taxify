import { defineConfig } from "vite";
import Terminal from "vite-plugin-terminal";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Taxify/",
  plugins: [react(), Terminal()],
});
