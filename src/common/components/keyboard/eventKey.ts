export const eventKeys = [
	'ArrowDown',
	'ArrowUp',
	'ArrowLeft',
	'ArrowRight',
	'Enter',
	'Space',
	'Tab',
	'Backspace',
	'Control',
	'Meta',
	'Home',
	'End',
	'PageDown',
	'PageUp',
	'Delete',
	'Escape',
	' ',
	'Shift'
]

export const eventKeysConst = [
	'ArrowDown',
	'ArrowUp',
	'ArrowLeft',
	'ArrowRight',
	'Enter',
	'Space',
	'Tab',
	'Backspace',
	'Control',
	'Meta',
	'Home',
	'End',
	'PageDown',
	'PageUp',
	'Delete',
	'Escape',
	' ',
	'Shift'
] as const

export type EventKey = typeof eventKeysConst[number]

export const eventKbdAbbrs: Partial<{ [k in EventKey]: string }> = {
	Meta: '⌘'
}

export const isEventKey = (o: any): o is EventKey => {
	return typeof o === 'string' && eventKeys.includes(o)
}
