/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Kanit', 'sans-serif'],
				// Other font families
			},
			dropShadow: {
				custom: ['2px 2px 2px #2c3136', '-2px -2px 2px #49525a'],
				custom2: [
					'inset 2px 2px 2px rgba(44, 49, 54, 1)',
					'inset -2px -2px 2px rgba(60, 67, 74, 1)',
				],
			},
		},
	},
	plugins: [],
};
