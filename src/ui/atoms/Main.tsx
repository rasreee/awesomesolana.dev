import { css } from '@emotion/react'

import { spacing } from '@/ui/foundations'
import styled from '@/ui/styled'

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${spacing(3)};
	padding: 0;
	position: relative;
	overflow-x: hidden;
	min-height: 100vh;
	width: 100vw;
	${({ theme }) =>
		css`
			background-color: ${theme.colors.bg};
		`}
`
