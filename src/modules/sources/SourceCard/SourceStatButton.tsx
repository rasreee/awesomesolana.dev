import React, { FC, HTMLAttributes } from 'react'

import { IconProps } from '@/ui/icon/IconProps'

export interface SourceStatButtonProps extends HTMLAttributes<HTMLButtonElement> {
	value: number
	icon: FC<IconProps>
}

export const SourceStatButton: React.FunctionComponent<SourceStatButtonProps> = ({ value, icon: Icon, ...props }) => {
	return (
		<button className="text-gray-700 font-semibold text-xs flex items-center gap-1" {...props}>
			<Icon className="text-gray-500 h-5" style={{ fontSize: '1.25em', marginTop: '0.05rem' }} />
			<div className="pt-0.5">{value}</div>
		</button>
	)
}
