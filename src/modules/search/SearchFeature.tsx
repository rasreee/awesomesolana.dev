import React from 'react'

import { SearchBar } from './SearchBar'
import { SearchModal, SearchModalProvider } from './SearchModal'

export interface SearchFeatureProps {}

export const SearchFeature: React.FunctionComponent<SearchFeatureProps> = () => {
	return (
		<>
			<SearchBar />
			<SearchModalProvider>{(props) => <SearchModal {...props} />}</SearchModalProvider>
		</>
	)
}
