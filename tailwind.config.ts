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
        'back': "#0D1B2A",
        'text': "#E0E0E0",
        'subtitle': "#AAB4C6",
        'primary': "#1B4D8A",
        'secondary': "#1A2B3C",
        'border': "#2C3E50",
        'error': "#D16BA5",
      }      
    },
  },
  plugins: [],
};
export default config;
