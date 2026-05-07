import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A12",
        panel: "rgba(15, 23, 42, 0.72)",
        electric: "#38BDF8",
        violet: "#8B5CF6"
      },
      boxShadow: {
        glow: "0 0 42px rgba(56, 189, 248, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
