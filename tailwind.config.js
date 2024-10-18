/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['sans-serif'],
				serif: ['serif'],
				archivo: ['Archivo Narrow', 'sans-serif'],
				bowlby: ['BowlbyOne Regular', 'Archivo Narrow', 'sans-serif'],
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				lemonade: {
					...require('daisyui/src/theming/themes')['lemonade'],
					primary: '#004F2D',

					secondary: '#676D16',
					// accent:"#bec000",
				},
			},
			,
			'coffee',
		],
		base: true,
	},
};
