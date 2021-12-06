module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	mode: 'jit',
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
					0: '#fff',
					50: '#eddeff',
					100: '#dfc4ff',
					200: '#d1abff',
					300: '#c392ff',
					400: '#b578ff',
					500: '#9945ff',
					600: '#811AFF',
					700: '#7000f7',
					800: '#5400ba',
					900: '#3f008c'
				},
				secondary: {
					0: '#fff',
					50: '#CEFDF0',
					100: '#94FADD',
					200: '#6DF8D1',
					300: '#3DF5C1',
					400: '#0CE9AB',
					500: '#0AC993',
					600: '#08AA7C',
					700: '#07926B',
					800: '#05664B',
					900: '#033527'
				},
				pink: {
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
