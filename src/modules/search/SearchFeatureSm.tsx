import React from 'react'

import { useModal } from '@/common/components/Modal/useModal'
import { useKeyCombo } from '@/common/hooks/useKeyCombo'

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
