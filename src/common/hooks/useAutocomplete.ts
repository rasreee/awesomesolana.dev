import React, { useEffect, useState } from 'react'

import { EventKey } from '../components/keyboard/keys'

export type UseAutoCompleteReturn = {
	selectedItemIndex: number
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
		onKeyDown: (event) => {
			const isBackward = event.code === EventKey.ArrowUp
			const isForward = event.code === EventKey.ArrowDown || event.code === EventKey.Tab

			if (isBackward || isForward) {
				event.preventDefault()
				const n = items.length + 1

				if (selectedItemIndex >= 0) {
					const step = isForward ? 1 : -1
					setSelectedItemIndex((((selectedItemIndex + step) % n) + n) % n)
				} else {
					setSelectedItemIndex(isForward ? 0 : n - 1)
				}
			} else if (event.code === EventKey.Enter && selectedItemIndex >= 0) {
				onSelect(items[selectedItemIndex])
			}
		}
	}
}
