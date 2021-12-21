import { useAmplitude } from './useAmplitude'

export const useLogEvent = () => {
	const instance = useAmplitude()

	const logEvent = (eventType: string) => {
		instance.logEvent({
			event_type: eventType
		})

		// Send any events that are currently queued for sending.
		// Will automatically happen on the next event loop.
		instance.flush()
	}

	return logEvent
}
