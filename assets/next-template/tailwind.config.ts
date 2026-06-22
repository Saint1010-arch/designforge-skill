import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // DesignForge: add extracted color tokens, fonts, radii, keyframes here.
      colors: {},
    },
  },
  plugins: [],
};
export default config;
