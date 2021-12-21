import React from 'react'

import { EventKey, isEventKey, KeyboardKey } from './keys'

const eventKbdAbbrs: Partial<{ [k in EventKey]: string }> = {
	Meta: '⌘',
	Escape: 'esc'
}

export const KbdSymbolItem = ({ id }: { id: KeyboardKey }) => {
	let abbrValue

	if (isEventKey(id)) {
		if (!Object.keys(eventKbdAbbrs).includes(id)) {
			console.warn(`KbdSymbolItem was passed unknown id ${id}`)
		}

		abbrValue = Object.keys(eventKbdAbbrs).includes(id) ? eventKbdAbbrs[id] : ''
	}

	abbrValue ??= id

	return <abbr className="no-underline">{abbrValue}</abbr>
}

export interface KbdSymbolProps {
	keys: KeyboardKey[]
}

export const KbdSymbol: React.FunctionComponent<KbdSymbolProps> = ({ keys }) => {
	return (
		<kbd className="font-sans font-semibold text-gray-300 dark:text-gray-500">
			{keys.map((kbdItem) => (
				<KbdSymbolItem key={kbdItem} id={kbdItem} />
			))}
		</kbd>
	)
}
