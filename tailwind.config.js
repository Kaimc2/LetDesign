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
      },
    },
  },
  plugins: [],
};
