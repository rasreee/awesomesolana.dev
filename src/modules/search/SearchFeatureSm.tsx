import React from 'react'

import { useKeyCombo } from '@/common/hooks/useKeyCombo'
import { useModal } from '@/components/Modal/useModal'

import { SearchButtonSm } from './SearchButtonSm'
import { SearchModal } from './SearchModal'

export const SearchFeatureSm: React.FunctionComponent = () => {
	const modal = useModal()
	useKeyCombo('Meta+k', modal.open)

	return (
		<>
			<SearchButtonSm onClick={modal.open} />
			<SearchModal {...modal} />
		</>
	)
}
