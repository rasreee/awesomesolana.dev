import { useClickOutside } from '@react-hookz/web'
import React, { HTMLAttributes, ReactNode, useRef } from 'react'

import { useOnKeyPress } from '@/common/hooks/useOnKeyPress'

import * as S from './Modal.styles'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	onRequestClose: () => void
	isOpen: boolean
	children: ReactNode
}

export function Modal({ children, isOpen, onRequestClose, ...props }: ModalProps) {
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
