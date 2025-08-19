module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7DBA8B',
        secondary: '#4D8C57',
        background: '#E7FFEF',
        alert: '#F76E6E',
        success: '#A2E4B8',
        humidity: '#AFE4F7',
        text: '#1E1E1E',
        subtext: '#5A5A5A',
        border: '#767676',
        white: '#FFFFFF',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
