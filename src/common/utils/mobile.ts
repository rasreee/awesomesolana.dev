const isBrowser = () => {
	return typeof window !== 'undefined'
}

/**
 * Returns whether running on a mobile device
 *
 * @return {boolean}
 */
export const isMobileDevice = (): boolean => {
	if (isBrowser()) {
		try {
			return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		} catch (e) {
			console.log(e)

			return false
		}
	} else {
		return false
	}
}
