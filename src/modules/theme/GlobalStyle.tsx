import { css, Global } from '@emotion/react'
import React from 'react'

import { cssVariables } from './cssVariables'

export const GlobalStyle = () => (
	<Global
		styles={css`
			${cssVariables}
		`}
	/>
)
