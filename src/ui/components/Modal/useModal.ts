import { useState } from 'react'

export const useModal = () => {
	const [isOpen, setOpen] = useState(false)

	const open = () => {
		setOpen(true)
	}

	const close = () => {
		setOpen(false)
	}

	return {
		isOpen,
		open,
		close,
		bind: {
			isOpen,
			onRequestClose: close
		}
	}
}
