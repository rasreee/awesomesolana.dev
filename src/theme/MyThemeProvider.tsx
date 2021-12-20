import { Theme, ThemeProvider } from '@emotion/react'
import classNames from 'classnames'
import React, { FC, useMemo, useState } from 'react'

import { theme } from '@/theme/theme'

import { ColorModeContext, ColorModeName } from './color-mode'

const MyThemeProvider: FC = ({ children }) => {
	const [colorMode, setColorMode] = useState<ColorModeName>('light')

	const currentTheme = useMemo(() => {
		// const newModeColors = colorModes[colorMode]
		// TODO implement dark/light colorMode toggle
		const newTheme = theme as Theme

		return newTheme
	}, [colorMode])

	return (
		<ThemeProvider theme={currentTheme}>
			<ColorModeContext.Provider value={{ colorMode, setColorMode }}>
				<div className={classNames(colorMode === 'light' ? 'bg-light' : 'bg-dark', 'min-w-screen min-h-screen')}>
					{children}
				</div>
			</ColorModeContext.Provider>
		</ThemeProvider>
	)
}

export { MyThemeProvider }
