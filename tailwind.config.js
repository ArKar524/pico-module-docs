/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.brand.600"),
              "&:hover": { color: theme("colors.brand.700") },
            },
            code: {
              color: theme("colors.teal.500"),
              backgroundColor: theme("colors.gray.100"),
              paddingInline: "0.25rem",
              borderRadius: "0.25rem",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            blockquote: {
              borderLeftColor: theme("colors.brand.500"),
              backgroundColor: theme("colors.brand.50"),
            },
            table: {
              thead: { borderBottomColor: theme("colors.brand.500") },
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme("colors.brand.400"),
              "&:hover": { color: theme("colors.brand.300") },
            },
            code: { backgroundColor: theme("colors.gray.800") },
            blockquote: {
              borderLeftColor: theme("colors.brand.400"),
              backgroundColor: theme("colors.brand.700") + "22",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
