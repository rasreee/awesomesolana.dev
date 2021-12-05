export const mockPromise = () => {
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve(null)
		}, 300)
	})

	return promise
}
