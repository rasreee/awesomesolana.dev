import { useUpdateEffect } from '@react-hookz/web'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

import { SourceType } from '@/models/source'
import { parseQueryParamAsArray } from '@/modules/core/nextRouter'

export type ISourcePageContext = {
	sourceTypes: SourceType[]
	setSourceTypes: Dispatch<SetStateAction<SourceType[]>>
}

export const SourcesFeedContext = createContext<ISourcePageContext | undefined>(undefined)

export const useSourcesFeed = () => {
	const context = useContext(SourcesFeedContext)
	if (!context) throw new Error()

	return context
}

export const SourcesFeedProvider = ({
	children,
	routerQuery
}: {
	children: ReactNode
	routerQuery: Record<string, string | string[] | undefined>
}) => {
	const [sourceTypes, setSourceTypes] = useState<SourceType[]>(parseQueryParamAsArray<SourceType>('type', routerQuery))

	useUpdateEffect(() => {
		const newSourceTypes = parseQueryParamAsArray<SourceType>('type', routerQuery)

		console.log({ newSourceTypes })
		setSourceTypes(newSourceTypes)
	}, [routerQuery])

	return <SourcesFeedContext.Provider value={{ sourceTypes, setSourceTypes }}>{children}</SourcesFeedContext.Provider>
}
