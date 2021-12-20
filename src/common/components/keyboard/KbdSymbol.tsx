import React from 'react'

import { EventKey, isEventKey, KeyboardKey } from './keys'

const eventKbdAbbrs: Partial<{ [k in EventKey]: string }> = {
	Meta: '⌘',
	Escape: 'esc'
}

export const KbdSymbolItem = ({ value }: { value: KeyboardKey }) => {
	if (isEventKey(value)) {
		if (!Object.keys(eventKbdAbbrs).includes(value)) {
			console.warn(`KbdSymbolItem was passed unknown value ${value}`)
		}

		const abbrVal = Object.keys(eventKbdAbbrs).includes(value) ? eventKbdAbbrs[value] : ''

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
		<kbd className="font-sans font-semibold text-gray-300 dark:text-gray-500">
			{keys.map((kbdItem) => (
				<KbdSymbolItem key={kbdItem} value={kbdItem} />
			))}
		</kbd>
	)
}
