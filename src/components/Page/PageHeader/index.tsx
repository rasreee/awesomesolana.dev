import { useIsMobileDevice } from '@/common/hooks'

import { DefaultPageHeader } from './DefaultPageHeader'
import { MobilePageHeader } from './MobilePageHeader'

export const PageHeader = () => {
	const isMobile = useIsMobileDevice()

	if (isMobile) return <MobilePageHeader />

	return <DefaultPageHeader />
}
