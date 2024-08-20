import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        primary: '#0046FF',
        '_blue-100': '#8CD2F5',
        '_blue-200': '#4BAFF5',
        '_blue-300': '#2878F5',
        '_blue-400': '#00236E',
        '_grey-100': '#EEEEEE',
        '_grey-200': '#D2D2D2',
        '_grey-300': '#929292',
      },
    },
  },
  plugins: [],
}
export default config
