const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#eefcfd',
					100: '#d4f6f9',
					200: '#aeebf3',
					300: '#76dcea',
					400: '#39c3da',
					500: '#1ba5bf',
					600: '#1986a1',
					700: '#1b6c83',
					800: '#1f586b',
					900: '#1e495b'
				},
				secondary: { ...colors.gray },
				'dark-primary': {
					50: '#f6f7f9',
					100: '#ecedf2',
					200: '#d5d8e2',
					300: '#b0b6c9',
					400: '#868faa',
					500: '#677090',
					600: '#525a77',
					700: '#434861',
					800: '#3a3f52',
					900: '#2f3240'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		styled: false
	}
};
