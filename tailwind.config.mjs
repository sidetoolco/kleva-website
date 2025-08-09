/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				sm: '1rem', //640px
				md: '1rem', //768px
				lg: '1rem', //1024px
				xl: '2rem', //1280px
				'2xl': '2rem', //1536px
			},
		},
		extend: {
			screens: {
				blog: '840px',
				desktop: '1440px',
			},
			width: {
				desktop: '1440px',
			},
			maxWidth: {
				desktop: '1440px',
			},
			colors: {
				black: '#141C25',
				coal: '#6A6767',
				primary: '#BE79FF',
				purple: '#8B5CF6',
				'primary-light': '#f2e4ff',
				white: '#ffffff',
				'full-white': '#FFFFFF',
				pale: '#F9F6FB',
				gray: '#afafaf',
				'gray-900': '#101828',
				secondary: '#344051',
				tertiary: '#637083',
				'text-secondary': '#E4E7EC',
			},
			fontFamily: {
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
				titles: ['Switzer', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
