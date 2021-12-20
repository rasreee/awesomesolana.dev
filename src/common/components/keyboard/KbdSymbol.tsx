import React from 'react'

import { eventKbdAbbrs, EventKey, isEventKey } from './eventKey'

export const KbdSymbolItem = ({ value }: { value: EventKey | string }) => {
	if (isEventKey(value)) {
		const abbrVal = eventKbdAbbrs[value] ?? ''

		if (!abbrVal) {
			console.warn(`KbdSymbolItem was passed unknown value ${abbrVal}`)
		}

		return <abbr className="no-underline text-gray-300 dark:text-gray-500">{abbrVal}</abbr>
	}

	return <>{value}</>
}

export interface KbdSymbolProps {
	keys: (EventKey | string)[]
}

export const KbdSymbol: React.FunctionComponent<KbdSymbolProps> = ({ keys }) => {
	return (
		<kbd className="font-sans font-semibold dark:text-gray-500">
			{keys.map((kbdItem) => (
				<KbdSymbolItem key={kbdItem} value={kbdItem} />
			))}
		</kbd>
	)
}
