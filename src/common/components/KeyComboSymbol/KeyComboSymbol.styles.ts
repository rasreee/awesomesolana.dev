import { CSSProperties } from 'react'

export const defaultKeyComboSymbolStyles: Record<'sm' | 'lg', CSSProperties> = {
	sm: {
		color: 'black',
		background: 'rgba(0,0,0,0.05)',
		border: '1px solid rgba(0,0,0,0.3)',
		borderRadius: '0.375rem',
		fontWeight: 'semibold',
		gap: '0.125rem',
		paddingLeft: '0.375rem',
		paddingRight: '0.375rem',
		minWidth: '2.25rem',
		height: '1.25rem',
		display: 'flex',
		alignItems: 'center'
	},
	lg: {
		color: 'black',
		background: 'rgba(0,0,0,0.05)',
		border: '1px solid rgba(0,0,0,0.3)',
		borderRadius: '0.375rem',
		fontWeight: 'semibold',
		gap: '0.125rem',
		paddingLeft: '0.375rem',
		paddingRight: '0.375rem',
		minWidth: '2.25rem',
		height: '1.5rem',
		display: 'flex',
		alignItems: 'center'
	}
}

export const defaultKeySymbolStyles: Record<'sm' | 'lg', CSSProperties> = {
	sm: { fontSize: '0.75rem', display: 'flex', alignItems: 'center', color: 'inherit' },
	lg: { fontSize: '1.125rem', display: 'flex', alignItems: 'center', color: 'inherit' }
}

export const keySymbolIconStyles: CSSProperties = {
	height: '1em',
	width: '1em',
	display: 'flex',
	alignItems: 'center',
	color: 'inherit'
}
