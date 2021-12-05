import { css } from '@emotion/react'

import { spacing } from './space'

const layouts = {
	container: {
		padding: [3, 4]
	}
}

export type Layout = keyof typeof layouts

export const layoutStyle = (key: Layout) => {
	const { padding } = layouts[key]

	return css`
		padding: ${spacing(...padding)};
	`
}

export { layouts }
