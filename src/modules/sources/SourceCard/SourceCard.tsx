import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { clampText } from '@/common/utils'
import { Source, SourceType } from '@/models/source/types'
import { useUpdateSourceData } from '@/models/source/useUpdateSourceData'
import { getPageLogger } from '@/modules/core/amplitude/amplitude'

import { useSourcesFeed } from '../SourcesFeed/SourcesFeedContext'
import { SourceCardFooter } from './SourceCardFooter'
import { SourceCardHeader } from './SourceCardHeader'

export interface SourceCardProps extends Source {}

const pageLogger = getPageLogger('SOURCES')

export function SourceCard(data: SourceCardProps) {
	const [localData, setLocalData] = useState(data)
	const updateSourceData = useUpdateSourceData(localData.id)
	const router = useRouter()

	const onClickLikes = async () => {
		const updatedData = await updateSourceData(localData.id, { likes: localData.likes + 1 })
		pageLogger.click(`LIKE_BUTTON_${localData.type.toLocaleUpperCase()}`)
		setLocalData(updatedData)
	}

	const onClickLink = async () => {
		const updatedData = await updateSourceData(localData.id, { views: localData.views + 1 })
		pageLogger.click(`SOURCE_LINK_${localData.type.toLocaleUpperCase()}`)
		router.push(localData.url)
		setLocalData(updatedData)
	}

	const { setSourceTypes } = useSourcesFeed()

	const onTypeClick = (type: SourceType) => {
		return () => {
			console.log(type)
			setSourceTypes([type])
		}
	}

	const descriptionText = useMemo(() => {
		const clampedDescription = clampText(localData.description ?? '', 85)

		return clampedDescription.length ? clampedDescription : 'No description.'
	}, [localData.description])

	return (
		<div
			className={classNames(
				'mobile:w-full',
				'h-52',
				'bg-white',
				'rounded-lg',
				'flex flex-col',
				'shadow-sm hover:shadow-lg',
				'mobile:mx-auto md:mx-1 md:my-1'
			)}
		>
			{/* Header */}
			<div className={classNames('flex items-center justify-between', 'overflow-hidden', 'px-4 pt-2', 'h-16')}>
				<SourceCardHeader onClickLink={onClickLink} title={localData.title} url={localData.url} />
			</div>
			{/* Body */}
			<div
				className={classNames(
					'relative',
					'flex flex-col flex-1 justify-between',
					'overflow-hidden w-full',
					'px-6 py-1.5 md:py-2'
				)}
			>
				<p className={'text-xs leading-5'}>{descriptionText}</p>
			</div>
			{/* Footer */}
			<div
				className={classNames(
					'w-full h-12',
					'flex items-center justify-between',
					'relative',
					'py-1.5 md:py-1',
					'pb-3',
					'bg-gray-50',
					'rounded-b-lg'
				)}
			>
				<SourceCardFooter
					type={localData.type}
					likes={localData.likes}
					views={localData.views}
					updatedAt={localData.updatedAt}
					onClickLikes={onClickLikes}
					onTypeClick={onTypeClick(localData.type)}
				/>
			</div>
		</div>
	)
}
