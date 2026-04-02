import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#FFF7F3",
          100: "#FFF0E6",
          200: "#FFD9C0",
          300: "#FFB88A",
          400: "#FF8C5A",
          500: "#FF6B2B",
          600: "#E85A1A",
          700: "#C44A0F",
          800: "#9A3A0A",
          900: "#6B2706",
        },
        dark: {
          DEFAULT: "#0F0F1A",
          800: "#1C1C2E",
          700: "#2A2A3E",
          600: "#3A3A52",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #FF6B2B 0%, #FF8C5A 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #FFF7F3 0%, #FFF0E6 50%, #FFD9C0 100%)",
        "dark-gradient": "linear-gradient(135deg, #0F0F1A 0%, #1C1C2E 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
