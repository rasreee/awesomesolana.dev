import React, { FC, HTMLAttributes } from 'react'

export type PageContentProps = HTMLAttributes<HTMLDivElement>

export const PageContent: FC<PageContentProps> = ({ children, ...props }) => {
	return <div {...props}>{children}</div>
}
