module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	mode: 'jit',
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
					0: '#fff',
					50: '#ebf0ff',
					100: '#d6e0ff',
					200: '#adc2ff',
					300: '#85a3ff',
					400: '#5c85ff',
					500: '#3355ff',
					600: '#0837ff',
					700: '#0038e0',
					800: '#002eb8',
					900: '#00248f'
				},
				secondary: {
					0: '#fff',
					50: '#ffebf6',
					100: '#ffd6ed',
					200: '#ffaddc',
					300: '#ff85ca',
					400: '#ff5cb8',
					500: '#FF39A8',
					600: '#ff0A95',
					700: '#e0007f',
					800: '#b80068',
					900: '#8f0051'
				},
				yellow: {
					0: '#fff',
					50: '#fefce8',
					100: '#FFF9D9',
					200: '#FFF1B3',
					300: '#FFE88D',
					400: '#FFDE71',
					500: '#FFCF42',
					600: '#DBAB30',
					700: '#B78921',
					800: '#936915',
					900: '#7A520C'
				},
				red: {
					0: '#fff',
					50: '#fef2f2',
					100: '#FFE8D2',
					200: '#FFCBA6',
					300: '#FFA879',
					400: '#FF8558',
					500: '#FF4D21',
					600: '#DB3018',
					700: '#B71810',
					800: '#930A0D',
					900: '#7A0611'
				},
				teal: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a'
				}
			},
			breakpoints: {
				mobile: { max: '480px' }
			}
		}
	},
	variants: {
		extend: {
			textColor: ['hover', 'disabled'],
			backgroundColor: ['disabled', 'hover'],
			backgroundOpacity: ['disabled', 'hover'],
			backgroundImage: ['disabled'],
			textOpacity: ['disabled'],
			cursor: ['disabled'],
			opacity: ['disabled'],
			display: ['responsive']
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
}
