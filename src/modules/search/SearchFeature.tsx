import { useRouter } from 'next/router'
import React from 'react'

import { useModal } from '@/common/components/Modal/useModal'
import { useKeyCombo } from '@/common/hooks/useKeyCombo'
import { Source } from '@/models/source/types'

import { SearchButton } from './SearchButton'
import { SearchModal } from './SearchModal'

export interface SearchFeatureProps {}

export const SearchFeature: React.FunctionComponent<SearchFeatureProps> = () => {
	const router = useRouter()
	const modal = useModal()
	useKeyCombo('Meta+k', modal.open)

	const onItemClick = (hit: Source) => {
		modal.close()
		router.push(`/sources/${hit.id}`)
	}

	return (
		<>
			<SearchButton onClick={modal.open} />
			<SearchModal onItemClick={onItemClick} {...modal} />
		</>
	)
}
