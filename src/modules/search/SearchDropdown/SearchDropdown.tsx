import React from 'react'

import { SearchData } from '../types'
import { ExpandedSearchResults } from './ExpandedSearchResults'

export interface SearchDropdownProps {
	shouldExpand: boolean
	onHitClick: any
	data: SearchData
}

export const SearchDropdown: React.FunctionComponent<SearchDropdownProps> = (props) => {
	return <ExpandedSearchResults {...props} />
}
