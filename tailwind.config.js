/* eslint-disable no-undef */
/**
  @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{tsx,js,jsx,ts}"
  ],
  theme: {
    extend: {},
  },

  plugins: [require ("daisyui")],
}

