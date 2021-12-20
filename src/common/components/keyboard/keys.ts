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

export const alphabetKeys = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
]

export const alphabetKeysConst = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z'
] as const

export type AlphabetKey = typeof alphabetKeys[number]

export const isAlphabetKey = (o: any): o is AlphabetKey => {
	return typeof o === 'string' && alphabetKeys.includes(o)
}

export type KeyboardKey = EventKey | AlphabetKey
