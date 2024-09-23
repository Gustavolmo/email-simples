import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'retro-16x16': '16px 16px 0px rgba(0, 0, 0, 0.5)',
        'retro-12x12': '12px 12px 0px rgba(0, 0, 0, 0.5)',
        'retro-8x16': '8px 16px 0px rgba(0, 0, 0, 0.5)',
        'retro-8x8': '8px 8px 0px rgba(0, 0, 0, 0.5)',
        'retro-4x4': '4px 4px 0px rgba(0, 0, 0, 0.5)',
        'inset-t-16': 'inset 0 16px 0 rgba(0, 0, 0, 0.5)',
      },
      colors: {
        "es-blue": "#1F2038",
        "es-green": "#22672F",
        "es-yellow": "#DFE450",
        "es-neutral": "#C9D4D4",
        "es-offwhite": "#FCFDF5",
      },
      backgroundImage: {
        "linear-gradient":
          "linear-gradient(to bottom right, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': '460px',
        '3xl': '1660px',
        '4xl': '1800px',
      },
    },
  },
  plugins: [],
};
export default config;
