/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Для папки `app` в Next.js
    './pages/**/*.{js,ts,jsx,tsx}', // Для стандартной папки страниц
    './components/**/*.{js,ts,jsx,tsx}', // Для компонентов
    './styles/**/*.{css}', // Если у вас есть глобальные CSS
  ],
  theme: {
    colors: {
      'violet': 'rgb(126, 78, 229)',
    },
    extend: {},
  },
  plugins: [],
};
