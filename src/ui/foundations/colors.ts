export const colors = {
	gray: {
		0: '#fff',
		50: '#f8fafc',
		100: '#f1f5f9',
		200: '#e2e8f0',
		300: '#cbd5e1',
		400: '#94a3b8',
		500: '#64748b',
		600: '#475569',
		700: '#334155',
		800: '#1e293b',
		900: '#0f172a'
	},
	warmGray: {
		0: '#fff',
		50: '#f5f6f8',
		100: '#d7dce1',
		200: '#babfc7',
		300: '#9ca3af',
		400: '#8c939e',
		500: '#7d828c',
		600: '#5e6269',
		700: '#3e4146',
		800: '#2f3134',
		900: '#1f2123'
	},
	blue: {
		0: '#fff',
		50: '#eff6ff',
		100: '#dbeafe',
		200: '#adc2ff',
		300: '#85a3ff',
		400: '#5c85ff',
		500: '#3366FF',
		600: '#2952cc', //
		700: '#2952cc',
		800: '#1f3d99',
		900: '#142966'
	},
	ultramarine: {
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
	strawberry: {
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
	solanaPrimary: {
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
	solanaSecondary: {
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
} as const

const palette = {
	pink: colors.strawberry[500],
	darkest: '#0E141B',
	darkGray: '#202f3c',
	gray: '#6C7E93',
	lightGray: '#9CA8B4',
	lightest: '#E2E5E9',
	blue: '#3366FF',
	yellow: '#F0C808',
	solanaPrimary: colors.solanaPrimary[500],
	solanaSecondary: colors.solanaSecondary[500],
	red: '#FF3D71',
	white: '#fff'
}

export const baseThemeColors = {
	...palette,
	primary: palette.solanaPrimary,
	secondary: palette.solanaSecondary,
	warning: palette.yellow,
	danger: palette.red
} as const
