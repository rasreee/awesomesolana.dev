import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface IInitialQueryContext {
	initialQuery: string
	setInitialQuery: Dispatch<SetStateAction<string>>
}

const InitialQueryContext = createContext<IInitialQueryContext | undefined>(undefined)

export const useInitialQuery = () => {
	const ctx = useContext(InitialQueryContext)
	if (!ctx) throw new Error()

	return ctx
}

// eslint-disable-next-line react/prop-types
export const InitialQueryProvider: React.FC = ({ children }) => {
	const [initialQuery, setInitialQuery] = useState<string>('')

	return (
		<InitialQueryContext.Provider value={{ initialQuery, setInitialQuery }}>{children}</InitialQueryContext.Provider>
	)
}
