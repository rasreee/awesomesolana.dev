import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { spacing } from '../foundations'

export const Stack = styled('div')<{ gutter?: number }>(
	css`
		display: grid;
	`,
	({ gutter = 6 }) => css`
		gap: ${spacing(gutter)};
	`
)
