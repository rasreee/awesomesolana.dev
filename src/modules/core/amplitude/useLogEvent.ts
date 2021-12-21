import { useAmplitude } from './useAmplitude'

export const useLogEvent = () => {
	const instance = useAmplitude()

	const logEvent = (eventType: string) => {
		instance.logEvent(eventType)
	}

	return logEvent
}
