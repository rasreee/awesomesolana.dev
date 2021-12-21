export const parseSourceTags = (tags: string | string[]): string[] => {
	if (typeof tags !== 'string') return tags

	try {
		const parsedTags = JSON.parse(tags)

		return parsedTags
	} catch (err) {
		console.log('Failed to parseSourceTags. ', { tags, error: err })
		console.log(tags.split(','))
		console.log('typeof tags: ', typeof tags.split(','))

		return []
	}
}
