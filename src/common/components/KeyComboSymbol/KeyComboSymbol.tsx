import { CSSProperties, HTMLAttributes } from 'react'

import { useIsMobileDevice } from '@/common/hooks'
import { EventKeys } from '@/common/hooks/useOnKeyPress'

import { CmdIcon } from './CmdIcon'
import { defaultKeyComboSymbolStyles, defaultKeySymbolStyles, keySymbolIconStyles } from './KeyComboSymbol.styles'

type KeySymbolProps = { eventCode: EventKeys | string; style: CSSProperties; size: 'sm' | 'lg' }

const KeySymbol = ({ eventCode, style, size }: KeySymbolProps) => {
	if (eventCode === 'Meta') {
		return (
			<div style={style}>
				<CmdIcon style={keySymbolIconStyles} />
			</div>
		)
	}

	const isMobileDevice = useIsMobileDevice()

	return (
		<div style={{ ...style, ...(!isMobileDevice && size === 'lg' ? { paddingTop: '0.125rem' } : {}) }}>
			{eventCode.toLocaleUpperCase()}
		</div>
	)
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
				<KeySymbol key={i} eventCode={key} size={size} style={keySymbolStyles ?? defaultKeySymbolStyles[size]} />
			))}
		</div>
	)
}

KeyComboSymbol.displayName = 'KeyComboSymbol'
