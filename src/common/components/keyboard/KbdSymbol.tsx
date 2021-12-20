import React from 'react'

import styled from '@/styled'

import { eventKbdAbbrs, isEventKey, KeyboardKey } from './keys'

const KbdSymbolItemAbbr = styled.abbr`
	text-decoration-line: none;
	color: var(--gray-300);
`

export const KbdSymbolItem = ({ value }: { value: KeyboardKey }) => {
	if (isEventKey(value)) {
		const abbrVal = eventKbdAbbrs[value] ?? ''

		if (!Object.keys(eventKbdAbbrs).includes(value)) {
			console.warn(`KbdSymbolItem was passed unknown value ${abbrVal}`)
		}

		return <KbdSymbolItemAbbr>{abbrVal}</KbdSymbolItemAbbr>
	} else {
		return <>{value}</>
	}
}

const Kbd = styled.kbd`
	font-weight: var(--font-semibold);
`

export interface KbdSymbolProps {
	keys: KeyboardKey[]
}

export const KbdSymbol: React.FunctionComponent<KbdSymbolProps> = ({ keys }) => {
	return (
		<Kbd>
			{keys.map((kbdItem) => (
				<KbdSymbolItem key={kbdItem} value={kbdItem} />
			))}
		</Kbd>
	)
}
