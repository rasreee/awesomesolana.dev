import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react'

import { useDebouncedAndAutofocusedInput, useKeyCombo, useModal } from '@/common/hooks'
import { Source } from '@/models/source/types'
import { useFindSourcesByQuery } from '@/models/source/useFindSourcesByQuery'

import { SearchModalProps } from './SearchModal'

export interface ISearchModalContext {
	initialQuery: string
	setInitialQuery: React.Dispatch<React.SetStateAction<string>>
	recents: Source[]
	setRecents: React.Dispatch<React.SetStateAction<Source[]>>
	updateRecents: (hit: Source) => void
	query: string
	setQuery: React.Dispatch<React.SetStateAction<string>>
	hits: Source[]
	setHits: React.Dispatch<React.SetStateAction<Source[]>>
	resetHits: () => void
}

export const SearchModalContext = createContext<ISearchModalContext | undefined>(undefined)

export const useSearchModal = () => {
	const context = useContext(SearchModalContext)
	if (!context) throw new Error()

	return context
}

export interface SearchModalProviderProps {
	children: (props: SearchModalProps) => JSX.Element
}

export const SearchModalProvider: FC<SearchModalProviderProps> = ({ children }) => {
	const { open: openModal, bind: bindModal } = useModal()
	useKeyCombo('Meta+k', openModal)
	const { value: query, bind, setValue: setQuery } = useDebouncedAndAutofocusedInput()

	const [hits, setHits] = useState<Source[]>([])

	const resetHits = () => {
		setQuery('')
		setHits([])
	}

	const [initialQuery, setInitialQuery] = useState<string>('')
	const [recents, setRecents] = useState<Source[]>([])

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

	const findSourcesByQuery = useFindSourcesByQuery()

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const query = bind.ref.current?.value
		if (!query) return setHits([])

		setIsLoading(true)

		const fetcher = async () => {
			const promise = new Promise((resolve) => {
				setTimeout(() => {
					resolve(null)
				}, 200)
			})

			await promise

			return findSourcesByQuery(query)
		}

		fetcher().then((res) => {
			console.log('Hits: ', res)
			setHits(res)
			setIsLoading(false)
		})
	}, [query])

	return (
		<SearchModalContext.Provider
			value={{
				initialQuery,
				setInitialQuery,
				updateRecents,
				recents,
				setRecents,
				query,
				setQuery,
				hits,
				setHits,
				resetHits
			}}
		>
			{children(bindModal)}
		</SearchModalContext.Provider>
	)
}
