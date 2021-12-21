export const formatToListOfPlurals = (list: string[]): string => {
	const result = list.map((item) => `${item}s`)
	if (result.length === 1) return result[0]

	const lastIndex = result.length - 1
	result[lastIndex] = `& ${result[lastIndex]}`
	const separator = result.length === 2 ? ' ' : ', '

	return result.join(separator)
}
