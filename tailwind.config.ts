import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        tile: {
          DEFAULT: "hsl(var(--tile))",
          correct: "hsl(var(--tile-correct))",
          wrong: "hsl(var(--tile-wrong))",
          misplaced: "hsl(var(--tile-misplaced))",
        },
        crimson: "hsl(var(--crimson))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        flip: {
          "0%": {
            transform: "rotateX(0deg)",
          },
          "50%": {
            transform: "rotateX(90deg)",
          },
          "100%": {
            transform: "rotateX(0deg)",
          },
        },
        shake: {
          "10%": { transform: "translateX(-1px)" },
          "90%": { transform: "translateX(-1px)" },
          "20%": { transform: "translateX(2px)" },
          "80%": { transform: "translateX(2px)" },
          "30%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(-4px)" },
          "70%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(4px)" },
        },
        jump: {
          "0%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-30px)" },
          "50%": { transform: "translateY(5px)" },
          "60%": { transform: "translateY(-15px)" },
          "80%": { transform: "translateY(2px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pop: "pop 70ms ease-in",
        flip: "flip 600ms ease-in",
        shake: "shake 600ms",
        jump: "jump 1000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config