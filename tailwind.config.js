/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./public/*.{html,js,css}",
  "./views/*.ejs",
  "./views/layouts/*.ejs",
  "./views/partials/*.ejs"
],
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px' 
  },
  theme: {
    extend: {
      colors: {
        yellow: '#ffb703',
      }
    },
  },
  plugins: [],
}

