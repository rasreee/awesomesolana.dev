const breakpoints = [0, 480, 768, 1920]

const Breakpoints = {
	xs: 0,
	sm: 1,
	md: 2,
	mobile: 1,
	tablet: 2,
	desktop: 3
}

export type Breakpoint = keyof typeof Breakpoints

function only(bp: Breakpoint) {
	const level = Breakpoints[bp]

	return `@media screen and (maxWidth: ${breakpoints[level]}px)`
}

export { only }
