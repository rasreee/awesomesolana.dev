import { createContext, Dispatch, SetStateAction, useCallback, useContext, useState } from 'react'

import { Tag } from '@/models/tag'

interface IRecentsContext {
	recents: Tag[]
	setRecents: Dispatch<SetStateAction<Tag[]>>
	updateRecents: (hit: Tag) => void
}

const RecentsContext = createContext<IRecentsContext | undefined>(undefined)

export const useRecents = () => {
	const ctx = useContext(RecentsContext)
	if (!ctx) throw new Error()

	return ctx
}

// eslint-disable-next-line react/prop-types
export const RecentsProvider: React.FC = ({ children }) => {
	const [recents, setRecents] = useState<Tag[]>([])

	const updateRecents = useCallback(
		(hit: Tag) => {
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

	return <RecentsContext.Provider value={{ recents, setRecents, updateRecents }}>{children}</RecentsContext.Provider>
}
