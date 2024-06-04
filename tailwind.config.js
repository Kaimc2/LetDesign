/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#EEAF2F",
        "secondary-80": "#E29D12",
        accent: "#5C19EB",
        "accent-80": "#4503D1",
        background: "#f5f5f5",
        "brand-gray": "#808080",
        success: "#00C851",
        "success-dark": "#007E33",
        warning: "#FFBB33",
        "warning-dark": "#FF8800",
        error: "#F03F2B",
        "error-dark": "#A81100",
      },
    },
  },
  plugins: [],
};
