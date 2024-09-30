/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: [],
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['lemonade', 'coffee'],
		base: true,
	},
};
