import { Ref, useEffect, useRef, useState } from 'react'

export function useHover<T extends HTMLElement>(): { isHovered: boolean; bind: { ref: Ref<T> } } {
	const [value, setValue] = useState<boolean>(false)
	const ref = useRef<T | null>(null)
	const handleMouseOver = (): void => setValue(true)
	const handleMouseOut = (): void => setValue(false)

	useEffect(
		() => {
			const node = ref.current

			node?.addEventListener('mouseover', handleMouseOver)
			node?.addEventListener('mouseout', handleMouseOut)

			return () => {
				node?.removeEventListener('mouseover', handleMouseOver)
				node?.removeEventListener('mouseout', handleMouseOut)
			}
		},
		[ref.current] // Recall only if ref changes
	)

	return { isHovered: value, bind: { ref } }
}
