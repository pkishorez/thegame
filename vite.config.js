/**
 * @type {import('vite').UserConfig}
 */
const config = {
  build: {
    manifest: true,
    outDir: "docs",
  },
  base: "/docs",
};

export default config;
