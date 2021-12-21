import { useContext } from 'react'

import { AmplitudeContext } from './AmplitudeProvider'

export const useAmplitude = () => {
	const ctx = useContext(AmplitudeContext)
	if (typeof ctx === 'undefined') throw new Error('failed to ensure defined context')

	return ctx
}
