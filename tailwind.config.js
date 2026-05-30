/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Example: fluid typography using clamp (optional)
      fontSize: {
        'fluid-base': 'clamp(1rem, 1vw + 0.5rem, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1.5vw + 0.5rem, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 2vw + 0.5rem, 2rem)',
      },
    },
  },
  plugins: [],
};
