import { useContext } from 'react'

import { AmplitudeContext } from './AmplitudeProvider'

export const useAmplitude = () => {
	const instance = useContext(AmplitudeContext)
	if (typeof instance === 'undefined') throw new Error('failed to ensure defined context')

	const logEvent = (eventType: string, data?: any) => {
		instance.logEvent(eventType, data)
	}

	return { logEvent }
}
