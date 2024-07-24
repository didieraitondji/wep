/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        c1: '#FFCB05',
        //c1: '#F4D35E',
        c2: '#FFFFFF',
        c3: '#262E33',
        c4: '#EBECED',
        c5: '#E5E3DF',
      },
    },
  },
  plugins: [],
}
