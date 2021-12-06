import { css } from '@emotion/react'
import * as React from 'react'

import styled from '@/ui/styled'

const LogoContainer = styled('div')`
	color: ${(props) => props.theme.colors.text};

	display: flex;
	align-items: center;

	svg {
		height: 1em;
	}
	${({ theme }) =>
		css`
			font-family: ${theme.fonts.sans};
			font-weight: ${theme.fontWeights.bold};
			color: ${theme.colors.primary};
			font-size: ${theme.fontSizes.sm};
		`}
`

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string
}

const Logo: React.FC<LogoProps> = (props) => {
	return <LogoContainer {...props}>Awesome Solana</LogoContainer>
}

export { Logo }
