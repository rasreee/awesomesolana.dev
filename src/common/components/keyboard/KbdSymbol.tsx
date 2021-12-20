import React from 'react'

import { eventKbdAbbrs, isEventKey, KeyboardKey } from './keys'

export const KbdSymbolItem = ({ value }: { value: KeyboardKey }) => {
	if (isEventKey(value)) {
		const abbrVal = eventKbdAbbrs[value] ?? ''

		if (!Object.keys(eventKbdAbbrs).includes(value)) {
			console.warn(`KbdSymbolItem was passed unknown value ${abbrVal}`)
		}

		return <abbr className="no-underline text-gray-300 dark:text-gray-500">{abbrVal}</abbr>
	} else {
		return <>{value}</>
	}
}

export interface KbdSymbolProps {
	keys: KeyboardKey[]
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
