import { CSSProperties, HTMLAttributes } from 'react'

import { EventKeys } from '@/common/hooks/useOnKeyPress'

import { CmdIcon } from './CmdIcon'
import { defaultKeyComboSymbolStyles, defaultKeySymbolStyles, keySymbolIconStyles } from './KeyComboSymbol.styles'

type KeySymbolProps = { eventCode: EventKeys | string; style: CSSProperties }

const KeySymbol = ({ eventCode, style }: KeySymbolProps) => {
	if (eventCode === 'Meta') {
		return (
			<div style={style}>
				<CmdIcon style={keySymbolIconStyles} />
			</div>
		)
	}

	return <div style={style}>{eventCode.toLocaleUpperCase()}</div>
}

export interface KeyCmdProps extends HTMLAttributes<HTMLDivElement> {
	keys: (EventKeys | string)[]
	keySymbolStyles?: CSSProperties
	size?: 'sm' | 'lg'
}

export function KeyComboSymbol({ keys, keySymbolStyles, size = 'lg', style, ...props }: KeyCmdProps) {
	return (
		<div style={{ ...defaultKeyComboSymbolStyles[size], ...style }} {...props}>
			{keys.map((key, i) => (
				<KeySymbol key={i} eventCode={key} style={keySymbolStyles ?? defaultKeySymbolStyles[size]} />
			))}
		</div>
	)
}

KeyComboSymbol.displayName = 'KeyComboSymbol'
