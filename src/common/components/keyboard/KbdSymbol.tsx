import React from 'react'

import { eventKbdAbbrs, EventKey, isEventKey } from './eventKey'

export interface KbdSymbolProps {
	keys: (EventKey | string)[]
}

export const KbdSymbol: React.FunctionComponent<KbdSymbolProps> = ({ keys }) => {
	const renderKbdItem = (kbdItem: EventKey | string) => {
		if (isEventKey(kbdItem)) {
			const abbrVal = eventKbdAbbrs[kbdItem] ?? ''

			return <abbr className="no-underline text-gray-300 dark:text-gray-500">{abbrVal}</abbr>
		}

		return <>{kbdItem}</>
	}

	return (
		<kbd className="font-sans font-semibold dark:text-gray-500">{keys.map((kbdItem) => renderKbdItem(kbdItem))}</kbd>
	)
}
