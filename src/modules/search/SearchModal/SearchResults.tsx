import React from 'react'

import { Source } from '@/models/source'

import { SearchHitButton } from './SearchHitButton'

export interface SearchResultsProps {
	hits: Source[]
}

export const SearchResults: React.FunctionComponent<SearchResultsProps> = ({ hits }) => {
	const onHitClick = (hit: Source) => {
		return () => {
			console.log(`Clicked source: `, JSON.stringify(hit))
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
