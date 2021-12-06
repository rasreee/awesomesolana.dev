import { css } from '@emotion/react'

import { pseudo } from '@/common/utils/pseudos'
import styled from '@/ui/styled'

const Anchor = styled.a`
	cursor: pointer;
	outline: none;
	border: none;
	text-decoration: none;
	margin-top: 0;
	margin-left: 0;
	margin-right: 0;
	transition: all 0.3s ease;
	${({ theme }) => css`
		font-weight: ${theme.fontWeights.semibold};
	`}
	opacity: 0.6;
	${pseudo('_hover')} {
		opacity: 1;
	}
	${pseudo('_active')} {
		opacity: 0.6;
	}
`

export { Anchor }
