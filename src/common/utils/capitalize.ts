export const capitalizeFirstLetter = (text: string): string => {
	const firstLetter = text[0]
	const rest = text.slice(1, text.length)

	return `${firstLetter.toUpperCase()}${rest}`
}

export const capitalizeEachFirstLetter = (text: string): string => {
	const splits = text.split(' ')
	const words = splits.map(capitalizeFirstLetter)

	return words.join(' ')
}
