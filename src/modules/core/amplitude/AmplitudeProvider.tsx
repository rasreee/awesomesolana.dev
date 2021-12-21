import * as Amplitude from '@amplitude/node'
import { createContext, useMemo } from 'react'

export const AmplitudeContext = createContext<Amplitude.NodeClient | undefined>(undefined)

export const initAmplitudeInstance = () => {
	const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
	if (!apiKey) throw new Error('NEXT_PUBLIC_AMPLITUDE_API_KEY was undefined')

	const instance = Amplitude.init(apiKey)

	return instance
}

export const AmplitudeProvider = ({ children }: { children: React.ReactNode }) => {
	const instance = useMemo(initAmplitudeInstance, [])

	return <AmplitudeContext.Provider value={instance}>{children}</AmplitudeContext.Provider>
}
