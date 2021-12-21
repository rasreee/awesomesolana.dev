import { useClickOutside } from '@react-hookz/web'
import { ReactNode, useRef } from 'react'

import { useOnKeyPress } from '@/common/hooks'

import * as S from './Modal.styles'

export interface ModalProps {
	children: ReactNode
	isOpen: boolean
	close: () => void
}

export function Modal({ isOpen, close: onRequestClose, children }: ModalProps) {
	const ref = useRef<HTMLDivElement | null>(null)

	useClickOutside(ref, onRequestClose)
	useOnKeyPress('Escape', onRequestClose)

	if (!isOpen) return null

	const onRef = (instance: HTMLDivElement | null) => {
		if (!instance) return
		ref.current = instance
	}

	return (
		<S.Backdrop>
			<S.Container ref={onRef}>{children}</S.Container>
		</S.Backdrop>
	)
}

Modal.Header = S.Header
Modal.Body = S.Body
Modal.Footer = S.Footer
