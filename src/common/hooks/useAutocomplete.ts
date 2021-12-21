import React, { useEffect, useState } from 'react'

import { EventKeys } from '../components/keyboard/keys'

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

	return {
		selectedItemIndex,
		setSelectedItemIndex,
		onKeyDown: (event) => {
			const isBackward = event.code === EventKeys.ArrowUp
			const isForward = event.code === EventKeys.ArrowDown || event.code === EventKeys.Tab

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
