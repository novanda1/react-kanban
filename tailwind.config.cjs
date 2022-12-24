const plugin = require('tailwindcss/plugin')

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
        'success-contrast': '#43936C',
        warning: '#FEEABC',
        'warning-100': '#FFFCF5',
        'warning-contrast': '#FA9810',
        error: '#F5B1B7;',
        'error-100': '#FFFAFA',
        'error-contrast': '#E11428',

        'btn-border': '#E0E0E0',
        'input-border': '#EDEDED',

        neutral: {
          20: '#FAFAFA',
          30: '#EDEDED',
          40: '#E0E0E0',
          60: '#757575',
          70: '#757575',
          90: '#404040',
          100: '#1D1F20',
          200: '#1E1F21',
        },
      },
      boxShadow: {
        btn: '0px 1px 2px rgba(0, 0, 0, 0.12)',
        modal: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        'kanban-menu': '0px 4px 4px rgba(0, 0, 0, 0.08)',
      },
      spacing: {
        app: '1440px',
        4.5: '18px',
        6.5: '26px',
      },
      width: {
        app: '1440px',
      },
      maxWidth: {
        app: '1440px',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('item-highlighted', '&[data-highlighted]')
    }),
  ],
}
