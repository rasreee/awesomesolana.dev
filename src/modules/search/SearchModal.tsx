import { useUpdateEffect } from '@react-hookz/web'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { EventKeys } from '@/common/components/keyboard/keys'
import { Modal, useModal } from '@/common/components/Modal'
import { useAutoComplete, useDebouncedAndAutofocusedInput, useOnKeyPress } from '@/common/hooks'
import { useFindSourcesByQuery } from '@/models/source'
import { Source } from '@/models/source/types'

import { SearchBar } from './SearchBar'
import { SearchDropdown } from './SearchDropdown'
import * as S from './SearchModal.styles'
import { SearchHitsData } from './types'

export interface SearchModalProps extends ReturnType<typeof useModal> {}

export const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
	const [initialQuery, setInitialQuery] = useState<string>('')
	const [recents, setRecents] = useState<Source[]>([])

	const input = useDebouncedAndAutofocusedInput()

	const [hits, setHits] = useState<Source[]>([])

	const resetHits = () => {
		input.setValue('')
		setHits([])
	}

	useUpdateEffect(resetHits, [props.isOpen])

	const updateRecents = useCallback(
		(hit: Source) => {
			// Create updated clone of recents
			let newRecents = [...recents].slice(0, 9)

			if (newRecents.some((r) => r.id === hit.id)) {
				newRecents = newRecents.filter((r) => r.id !== hit.id)
			}

			newRecents.unshift(hit)
			// Update the list
			setRecents(newRecents)
		},
		[recents]
	)

	const router = useRouter()

	const handleItemClick = (hit: Source) => () => {
		debugger
		console.log('HIT CLICKED:', hit)
		updateRecents(hit)
		setInitialQuery(hit.title)
		router.push(`/sources/${hit.id}`)
		props.close()
	}

	const searchData = useMemo(() => {
		const data = hits.length > 0 ? { list: hits, type: 'hits' } : { list: recents, type: 'recents' }

		return data as SearchHitsData
	}, [hits, recents])

	const {
		selectedItemIndex: focusedItemIndex,
		onKeyDown,
		setSelectedItemIndex: setFocusedItemIndex
	} = useAutoComplete(searchData.list, handleItemClick)

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

	const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

	useUpdateEffect(() => {
		const focusedButtonRef = buttonRefs.current[focusedItemIndex]
		focusedButtonRef?.focus()
	}, [focusedItemIndex])

	useOnKeyPress(EventKeys.ArrowUp, () => {
		if (focusedItemIndex === 0) return
		setFocusedItemIndex(focusedItemIndex - 1)
	})

	useOnKeyPress(EventKeys.ArrowDown, () => {
		if (focusedItemIndex === searchData.list.length - 1) return
		setFocusedItemIndex(focusedItemIndex + 1)
	})

	useOnKeyPress(EventKeys.Tab, () => {
		if (focusedItemIndex === searchData.list.length - 1) return
		setFocusedItemIndex(focusedItemIndex + 1)
	})

	return (
		<Modal {...props}>
			<SearchBar isLoading={isLoading} {...input} onKeyDown={onKeyDown} />
			{searchData.list.length > 0 && (
				<SearchDropdown
					data={searchData}
					renderItem={(hit, index) => {
						return (
							<S.ListItem key={hit.id}>
								<S.ItemButton isFocused={index === focusedItemIndex} onClick={handleItemClick(hit)}>
									{hit.title}
								</S.ItemButton>
							</S.ListItem>
						)
					}}
				/>
			)}
		</Modal>
	)
}
