module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito', 'sans-serif']
      },
      colors: {
        whitesmoke: {
          DEFAULT: '#F5F5F5',
          500: '#F5F5F5',
          600: '#D9D9D9',
          700: '#BDBDBD',
          800: '#A1A1A1',
          900: '#858585'
        },
        sorbus: {
          DEFAULT: '#F98009',
          300: '#FBA959',
          400: '#FA9531',
          500: '#F98009',
          600: '#C56405',
          700: '#8E4803'
        },
        eerie: {
          700: '#363636',
          800: '#1F1F1F',
          900: '#171717'
        },
        felse: {
          DEFAULT: '#46E79E'
        },
        for: {
          DEFAULT: '#1BAFBD'
        }
      }
    }
  },
  plugins: []
}
