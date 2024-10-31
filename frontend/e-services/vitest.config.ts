import { defineConfig } from "vite";

export default defineConfig({
  //@ts-ignore
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.js",
    coverage: {
      provider: "c8"
    }
  },
});