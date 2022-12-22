/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#01959F',
        'primary-100': '#F7FEFF',
        success: '#B8DBCA',
        'success-100': '#F8FBF9',
        warning: '#FEEABC',
        'warning-100': '#FFFCF5',

        'btn-border': '#E0E0E0',
        'input-border': '#EDEDED',

        neutral: {
          90: '#404040',
          100: '#1D1F20',
        },
      },
      boxShadow: {
        btn: '0px 1px 2px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
