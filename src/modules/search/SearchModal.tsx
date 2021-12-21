import { useUpdateEffect } from '@react-hookz/web'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Modal, useModal } from '@/common/components/Modal'
import { useAutoComplete, useDebouncedAndAutofocusedInput, useSearchHistory } from '@/common/hooks'
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

	const searchData = useMemo(() => {
		const data = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		return data as SearchHitsData
	}, [hits, recents])

	const findSourcesByQuery = useFindSourcesByQuery()

	const [isLoading, setIsLoading] = useState(false)

	const submitQuery = async (query: string) => {
		if (!query) return setHits([])

		setIsLoading(true)

		findSourcesByQuery(query).then((res) => {
			setHits(res)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		const query = input.value
		submitQuery(query)
	}, [input.value])

	const router = useRouter()

	const onItemClick = (hit: Source) => () => {
		updateRecents(hit)
		router.push(`/sources/${hit.id}`)
		props.close()
	}

	useAutoComplete(searchData.list, onItemClick)

	const renderDropdownItem = useCallback(
		(hit: Source) => {
			return <S.ItemButton onClick={onItemClick(hit)}>{hit.title}</S.ItemButton>
		},
		[onItemClick]
	)

	return (
		<Modal {...props}>
			<SearchBar isLoading={isLoading} {...input} onSubmitQuery={submitQuery} />
			{searchData.list.length > 0 && input.value.length > 0 && (
				<SearchDropdown data={searchData} renderItem={renderDropdownItem} />
			)}
		</Modal>
	)
}
