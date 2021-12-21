import { useUpdateEffect } from '@react-hookz/web'
import React, { useEffect, useRef, useState } from 'react'

import { EventKeys } from '../components/keyboard/keys'
import { useOnKeyPress } from './useOnKeyPress'

export type UseAutoCompleteReturn = {
	selectedItemIndex: number
	setSelectedItemIndex: React.Dispatch<React.SetStateAction<number>>
	onKeyDown: (event: React.KeyboardEvent) => void
}

export function useAutoComplete<ItemType extends object = object>(
	items: ItemType[],
	onSelect: (item: ItemType) => void
): UseAutoCompleteReturn {
	const [selectedItemIndex, setSelectedItemIndex] = useState(-1)

	useEffect(() => {
		setSelectedItemIndex(0)
	}, [items])

	const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

	useUpdateEffect(() => {
		const focusedButtonRef = buttonRefs.current[selectedItemIndex]
		focusedButtonRef?.focus()
	}, [selectedItemIndex])

	useOnKeyPress(EventKeys.ArrowUp, () => {
		if (selectedItemIndex === 0) return
		console.log('decrementing to ' + selectedItemIndex + 1)
		setSelectedItemIndex(selectedItemIndex - 1)
	})

	useOnKeyPress(EventKeys.ArrowDown, () => {
		console.log('incrementing to ' + selectedItemIndex + 1)
		if (selectedItemIndex === items.length - 1) return
		setSelectedItemIndex(selectedItemIndex + 1)
	})

	useOnKeyPress(EventKeys.Tab, () => {
		if (selectedItemIndex === items.length - 1) return
		console.log('incrementing to ' + selectedItemIndex + 1)
		setSelectedItemIndex(selectedItemIndex + 1)
	})

	return {
		selectedItemIndex,
		setSelectedItemIndex,
		onKeyDown: (event) => {
			const isBackward = event.code === EventKeys.ArrowUp
			const isForward = event.code === EventKeys.ArrowDown || event.code === EventKeys.Tab
			console.log(isBackward ? 'Backward Key' : 'Forward Key')

			if (isBackward || isForward) {
				event.preventDefault()
				const n = items.length + 1

				if (selectedItemIndex >= 0) {
					const step = isForward ? 1 : -1
					setSelectedItemIndex((((selectedItemIndex + step) % n) + n) % n)
				} else {
					setSelectedItemIndex(isForward ? 0 : n - 1)
				}
			} else if (event.code === EventKeys.Enter && selectedItemIndex >= 0) {
				onSelect(items[selectedItemIndex])
			}
		}
	}
}
