import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { border, spacing } from '../foundations'

export const Header = styled.header`
	height: ${spacing(8)};
	max-height: ${spacing(8)};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	${({ theme }) =>
		css`
			padding: ${spacing(...theme.layouts.container.padding)};
		`};

	${({ theme }) => css`
		border-bottom: ${border(1, theme.colors.outline)};
	`}
`
