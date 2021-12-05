import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'

export interface ModalProps extends ReactModal.Props {
	onRequestClose: () => void
	isOpen: boolean
	children: ReactNode
}

export const Modal: React.FunctionComponent<ModalProps> = ({ children, isOpen, onRequestClose, ...props }) => {
	return (
		<ReactModal {...{ isOpen, onRequestClose }} {...props}>
			{children}
		</ReactModal>
	)
}
