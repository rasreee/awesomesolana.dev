import React from 'react'

import { Tag } from '@/models/tag'

import { SearchHitButton } from './SearchHitButton'

export interface SearchResultsProps {
	hits: Tag[]
}

export const SearchResults: React.FunctionComponent<SearchResultsProps> = ({ hits }) => {
	const onHitClick = (hit: Tag) => {
		return () => {
			console.log(`Clicked tag: `, JSON.stringify(hit))
		}
	}

	return (
		<div>
			<div>
				{hits.map((hit) => (
					<li key={hit.id}>
						<SearchHitButton onClick={onHitClick(hit)} hit={hit} />
					</li>
				))}
			</div>
		</div>
	)
}
