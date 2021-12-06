import { SWRResponse } from 'swr'
export interface SWRResponseWithLoading<D, E> extends SWRResponse<D, E> {
	isLoading: boolean
}
