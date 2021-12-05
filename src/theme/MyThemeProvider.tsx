import { Theme, ThemeProvider } from '@emotion/react'
import React, { FC, useMemo, useState } from 'react'

import { theme } from '@/theme/theme'
import styled from '@/ui/styled'

import { ColorModeContext, ColorModeName } from './color-mode'

const BgColor = styled.div`
	background-color: ${(props) => props.theme.colors.bg};
	min-width: 100vw;
	min-height: 100vh;
`

const MyThemeProvider: FC = ({ children }) => {
	const [colorMode, setColorMode] = useState<ColorModeName>('light')

	const currentTheme = useMemo(() => {
		const newModeColors = theme.modes[colorMode]
		const newTheme = { ...theme, colors: { ...theme.colors, ...newModeColors } } as Theme

		return newTheme
	}, [colorMode])

	return (
		<ThemeProvider theme={currentTheme}>
			<ColorModeContext.Provider value={{ colorMode, setColorMode }}>
				<BgColor>{children}</BgColor>
			</ColorModeContext.Provider>
		</ThemeProvider>
	)
}

export { MyThemeProvider }
