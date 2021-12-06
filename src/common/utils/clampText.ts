export const clampText = (text: string, maxLength: number) => {
	const postFix = text.length > maxLength ? '...' : ''

	return `${text.slice(0, maxLength)}${postFix}`
}
