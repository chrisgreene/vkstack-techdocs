import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so the build works on GitHub Pages / any subpath or file host.
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    // data.json is large; leave it as a static asset rather than inlining.
    assetsInlineLimit: 0,
  },
  server: {
    port: 5173,
    open: false,
  },
});
