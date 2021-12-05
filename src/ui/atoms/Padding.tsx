import classNames from 'classnames'
import { FC } from 'react'

export type PaddingProps = { px?: number; py?: number; p?: number }

export const Padding: FC<PaddingProps> = ({ children, px = 0, py = 0, p = 0 }) => {
	return <div className={classNames(`px-${px}`, `py-${py}`, `p-${p}`)}>{children}</div>
}
