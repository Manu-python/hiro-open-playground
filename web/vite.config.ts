import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Serve the repository's canonical movement media; do not create a second source copy.
  publicDir: "../assets",
  test: { environment: "jsdom" }
});
