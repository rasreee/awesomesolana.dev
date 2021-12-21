import { useUpdateEffect } from '@react-hookz/web'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Modal, useModal } from '@/common/components/Modal'
import { useAutoComplete, useDebouncedAndAutofocusedInput, useOnKeyPress, useSearchHistory } from '@/common/hooks'
import { useFindSourcesByQuery } from '@/models/source'
import { Source } from '@/models/source/types'

import { SearchBar } from './SearchBar'
import { SearchDropdown } from './SearchDropdown'
import * as S from './SearchModal.styles'
import { SearchHitsData } from './types'

export interface SearchModalProps extends ReturnType<typeof useModal> {}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const { initialQuery, updateRecents, recents } = useSearchHistory()

	const input = useDebouncedAndAutofocusedInput()

	const [hits, setHits] = useState<Source[]>([])

	const resetHits = () => {
		input.setValue('')
		setHits([])
	}

	useUpdateEffect(resetHits, [props.isOpen])

	const router = useRouter()

	const onItemClick = (hit: Source) => () => {
		updateRecents(hit)
		router.push(`/sources/${hit.id}`)
		props.close()
	}

	const searchData = useMemo(() => {
		const data = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		return data as SearchHitsData
	}, [hits, recents])

	const { selectedItemIndex: focusedItemIndex, onKeyDown } = useAutoComplete(searchData.list, onItemClick)

	const findSourcesByQuery = useFindSourcesByQuery()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = input.value
		if (!query) return setHits([])

		setIsLoading(true)

		findSourcesByQuery(query).then((res) => {
			console.log('Hits: ', res)
			setHits(res)
			setIsLoading(false)
		})
	}, [input.value])

	const renderDropdownItem = useCallback(
		(hit: Source, index: number) => {
			return (
				<S.ListItem key={hit.id}>
					<S.ItemButton isFocused={index === focusedItemIndex} onClick={onItemClick(hit)}>
						{hit.title}
					</S.ItemButton>
				</S.ListItem>
			)
		},
		[focusedItemIndex]
	)

	return (
		<Modal {...props}>
			<SearchBar isLoading={isLoading} {...input} onKeyDown={onKeyDown} />
			{searchData.list.length > 0 && <SearchDropdown data={searchData} renderItem={renderDropdownItem} />}
		</Modal>
	)
}
