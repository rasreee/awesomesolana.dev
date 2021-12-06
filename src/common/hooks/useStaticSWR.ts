import useSWR, { Fetcher, Key, mutate, SWRResponse } from 'swr'

export const useStaticSWR = <Data, Error>(key: Key, updateData?: Data | Fetcher<Data>): SWRResponse<Data, Error> => {
	if (!updateData) {
		mutate(key, updateData)
	}

	return useSWR(key, null, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false
	})
}
