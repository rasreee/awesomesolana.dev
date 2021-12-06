import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'

import * as S from './styles'

export interface ModalProps extends ReactModal.Props {
	onRequestClose: () => void
	isOpen: boolean
	children: ReactNode
}

export function Modal({ children, isOpen, onRequestClose, ...props }: ModalProps) {
	return <S.Container {...{ isOpen, onRequestClose, ...props }}>{children}</S.Container>
}

Modal.Header = S.Header
Modal.Body = S.Body
Modal.Footer = S.Footer
