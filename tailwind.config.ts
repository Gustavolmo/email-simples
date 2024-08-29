import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "es-blue": "#1F2038",
        "es-green": "#22672F",
        "es-yellow": "#DFE450",
      },
      backgroundImage: {
        "linear-gradient":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
      screens: {
        '3xl': '1660px',
        '4xl': '1800px',
      },
    },
  },
  plugins: [],
};
export default config;
