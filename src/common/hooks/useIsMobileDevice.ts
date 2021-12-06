import { useMemo } from 'react'

const isBrowser = () => {
	return typeof window !== 'undefined'
}

const isMobileDevice = (): boolean => {
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

export const useIsMobileDevice = () => {
	return useMemo(isMobileDevice, [])
}
