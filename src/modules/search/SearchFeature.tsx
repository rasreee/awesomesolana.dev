import React from 'react'

import { useKeyCombo } from '@/common/hooks/useKeyCombo'
import { useModal } from '@/components/Modal/useModal'

import { SearchButton } from './SearchButton'
import { SearchModal } from './SearchModal'

export const SearchFeature: React.FunctionComponent = () => {
	const modal = useModal()
	useKeyCombo('Meta+k', modal.open)

	return (
		<>
			<SearchButton onClick={modal.open} />
			<SearchModal {...modal} />
		</>
	)
}
