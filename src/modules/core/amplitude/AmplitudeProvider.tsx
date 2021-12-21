import amplitude from 'amplitude-js'
import { createContext, useMemo } from 'react'

export const AmplitudeContext = createContext<amplitude.AmplitudeClient | undefined>(undefined)

export const initAmplitudeInstance = () => {
	const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
	if (!apiKey) throw new Error('NEXT_PUBLIC_AMPLITUDE_API_KEY was undefined')

	return amplitude.getInstance()
}

export const AmplitudeProvider = ({ children }: { children: React.ReactNode }) => {
	const instance = useMemo(initAmplitudeInstance, [])

	return <AmplitudeContext.Provider value={instance}>{children}</AmplitudeContext.Provider>
}
