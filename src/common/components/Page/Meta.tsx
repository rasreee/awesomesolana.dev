import Head from 'next/head'
import { NextSeo } from 'next-seo'
import React, { useMemo } from 'react'

import { AppConfig } from '@/common/utils/AppConfig'
import { colors } from '@/ui/foundations/colors'

import { appleTouchIcon, favIcon, favIcon16, favIcon32, safariPinnedTab } from './constants'

export type MetaProps = {
	title: string
	description: string
	image?: string
	canonical?: string
}

export const Meta: React.FunctionComponent<MetaProps> = ({ description, title, image, canonical }) => {
	const titleText = useMemo(() => title + ' - Awesome Solana', [title])

	return (
		<>
			<Head>
				<meta charSet="UTF-8" key="charset" />
				<meta httpEquiv="" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" key="viewport" />
				<meta name="description" content={description} />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="theme-color" content={colors.primary[500]} />
				<meta property="og:title" content={titleText} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:title" content={titleText} />
				<meta name="twitter:image" content={image} />
				<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
				<link rel="mask-icon" href={safariPinnedTab} color={colors.primary[500]} />
				<link rel="icon" type="image/png" sizes="32x32" href={favIcon32} />
				<link rel="icon" type="image/png" sizes="16x16" href={favIcon16} />
				<link rel="shortcut icon" href={favIcon} />
				<title>{titleText}</title>
			</Head>
			<NextSeo
				title={title}
				description={description}
				canonical={canonical}
				openGraph={{
					title: titleText,
					description,
					url: canonical,
					locale: AppConfig.locale,
					site_name: AppConfig.site_name
				}}
			/>
		</>
	)
}
