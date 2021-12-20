import { useClickOutside } from '@react-hookz/web'
import { ReactNode, useRef } from 'react'

import { useOnKeyPress } from '@/common/hooks/useOnKeyPress'

import * as S from './Modal.styles'
import { useModal } from './useModal'

export interface ModalProps extends ReturnType<typeof useModal> {
	children: ReactNode
}

export function Modal({ isOpen, close: onRequestClose, children, ...props }: ModalProps) {
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
			<S.Container ref={onRef} {...props}>
				{children}
			</S.Container>
		</S.Backdrop>
	)
}

Modal.Header = S.Header
Modal.Body = S.Body
Modal.Footer = S.Footer
