import { SWRResponse } from 'swr'

export type SWRResponseWithLoading<D, E> = SWRResponse<D, E> & { isLoading: boolean }
