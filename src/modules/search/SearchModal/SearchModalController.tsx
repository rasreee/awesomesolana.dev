import React from 'react'

import { SearchModal } from './SearchModal'
import { SearchModalProvider } from './SearchModalContext'

export const SearchModalController: React.FunctionComponent = () => {
	return <SearchModalProvider InnerModal={SearchModal} />
}
