module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lg': '1024px', // Large screens (desktops)
        'md': '768px',  // Medium screens (tablets)
        'sm': '640px',  // Small screens (mobile)
      },
      colors: {
        'deep-blue': '#060A59',
        'dark-purple': '#040053',
        'light-cyan': '#4FD3DC',
        'action-red': '#CB2D2B',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
