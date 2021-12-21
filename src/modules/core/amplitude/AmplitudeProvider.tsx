import amplitude from 'amplitude-js'
import { createContext, useMemo } from 'react'

export const AmplitudeContext = createContext<amplitude.AmplitudeClient | undefined>(undefined)

export const initAmplitude = () => {
	// const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
	const apiKey = '9d7822c346fe1b2da8c0caac722f09ad'
	if (!apiKey) throw new Error('NEXT_PUBLIC_AMPLITUDE_API_KEY was undefined')

	return amplitude.getInstance()
}

export const AmplitudeProvider = ({ children }: { children: React.ReactNode }) => {
	const instance = useMemo(() => {
		if (typeof navigator === 'undefined') return null
		const instance = initAmplitude()

		return instance
	}, [])

	if (!instance) return null

	return <AmplitudeContext.Provider value={instance}>{children}</AmplitudeContext.Provider>
}
