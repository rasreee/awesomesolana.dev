import classNames from 'classnames'
import { useRouter } from 'next/router'

export const MobilePageHeader = () => {
	const router = useRouter()

	const isHomePage = router.pathname === '/'

	if (!isHomePage) {
		return <header className={classNames('px-6 py-3')}></header>
	}

	return <header className={classNames('h-12', 'flex justify-between gap-2')}></header>
}
