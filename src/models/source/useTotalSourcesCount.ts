import { useMemo } from 'react'

import { useSourceCounts } from './useSourceCounts'

export const useTotalSourcesCount = () => {
	const { data } = useSourceCounts()

	return useMemo(() => {
		if (!data) return 0

		let totalCount = 0

		Object.values(data).forEach((count) => {
			totalCount += count
		})

		return totalCount
	}, [data])
}
