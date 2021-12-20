import { ReactNode } from 'react'
import ReactModal from 'react-modal'

import * as S from './Modal.styles'

ReactModal.setAppElement('#__next')

export interface ModalProps {
	children: ReactNode
	isOpen: boolean
	close: () => void
}

export function Modal({ isOpen, close: onRequestClose, children }: ModalProps) {
	return <ReactModal {...{ onRequestClose, isOpen }}>{children}</ReactModal>
}

Modal.Header = S.Header
Modal.Body = S.Body
Modal.Footer = S.Footer
