import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Source, SourceType } from '@/models/source/types'
import { useUpdateSourceData } from '@/models/source/useUpdateSourceData'

import { useSourcesFeed } from '../SourcesFeedContext'
import { SourceCardBody } from './SourceCardBody'
import { SourceCardFooter } from './SourceCardFooter'
import { SourceCardHeader } from './SourceCardHeader'

export interface SourceCardProps extends Source {}

export function SourceCard(data: SourceCardProps) {
	const [localData, setLocalData] = useState(data)
	const updateSourceData = useUpdateSourceData(localData.id)
	const router = useRouter()

	const onClickLikes = async () => {
		const updatedData = await updateSourceData(localData.id, { likes: localData.likes + 1 })
		setLocalData(updatedData)
	}

	const onClickLink = async () => {
		const updatedData = await updateSourceData(localData.id, { views: localData.views + 1 })
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
				<SourceCardBody description={localData.description} tags={localData.tags} />
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
