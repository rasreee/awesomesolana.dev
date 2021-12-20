import React from 'react'

import { useKeyCombo, useModal } from '@/common/hooks'

import { SearchModal } from './SearchModal'

export const SearchModalController: React.FunctionComponent = () => {
	const { open: openModal, bind: bindModal } = useModal()
	useKeyCombo('Meta+k', openModal)

	return <SearchModal {...bindModal} />
}
