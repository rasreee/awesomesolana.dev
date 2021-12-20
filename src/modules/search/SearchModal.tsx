import React, { useState } from 'react'

import { Modal, useModal } from '@/common/components/Modal'
import { Source } from '@/models/source/types'

import { Search } from './Search'

export interface SearchModalProps extends ReturnType<typeof useModal> {
	onHitClick: (hit: Source) => void
}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const [initialQuery, setInitialQuery] = useState<string>('')
	const [recents, setRecents] = useState<Source[]>([])

	return (
		<Modal {...props}>
			<Search onHitClick={props.onHitClick} {...{ initialQuery, setInitialQuery, recents, setRecents }} />
		</Modal>
	)
}
