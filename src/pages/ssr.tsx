import { getSnapshot } from 'mobx-state-tree'

import { initializeStore } from '@/store/store'

import SampleComponent from '../components/SampleComponent'
export type SsrProps = { initialState: any }

export default function Ssr({ initialState }: SsrProps) {
	return <SampleComponent title={'SSR Page'} linkTo="/" store={initialState} />
}

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
	const store = initializeStore()

	store.update()

	return { props: { initialState: getSnapshot(store) } }
}
