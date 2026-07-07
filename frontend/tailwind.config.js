export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(15, 23, 42, 0.08)",
        overlay: "0 24px 90px rgba(15, 23, 42, 0.12)",
      },
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
    },
  },
  plugins: [],
}
