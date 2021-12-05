import { useRef, useState } from 'react'

export const useFocus = () => {
	const ref = useRef<HTMLInputElement | null>(null)
	const [isFocused, setFocused] = useState<boolean>(false)

	const onFocus = () => setFocused(true)
	const onBlur = () => setFocused(false)

	const focus = () => {
		ref.current?.focus()
	}

	const blur = () => {
		ref.current?.blur()
	}

	return {
		isFocused,
		focus,
		blur,
		bind: {
			ref,
			onFocus,
			onBlur
		}
	}
}
