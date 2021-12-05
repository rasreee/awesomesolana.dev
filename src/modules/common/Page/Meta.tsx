import Head from 'next/head'
import React from 'react'

import { theme } from '@/theme/theme'

import { appleTouchIcon, favIcon, favIcon16, favIcon32, safariPinnedTab } from './constants'

export type MetaProps = {
	title: string
	description: string
	image?: string
}

export const Meta: React.FunctionComponent<MetaProps> = ({ description, title, image }) => {
	return (
		<Head>
			<meta httpEquiv="" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			<meta name="description" content={description} />
			<link rel="manifest" href="/site.webmanifest" />
			<meta name="theme-color" content={theme.colors.primary} />
			<meta property="og:title" content={title + ' - @rasreee'} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:title" content={title + ' - @rasreee'} />
			<meta name="twitter:image" content={image} />
			<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
			<link rel="mask-icon" href={safariPinnedTab} color={theme.colors.primary} />
			<link rel="icon" type="image/png" sizes="32x32" href={favIcon32} />
			<link rel="icon" type="image/png" sizes="16x16" href={favIcon16} />
			<link rel="shortcut icon" href={favIcon} />
			<title>{title + ' - @rasreee'}</title>
		</Head>
	)
}
