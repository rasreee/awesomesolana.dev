import classNames from 'classnames'
import Link from 'next/link'

import { SourceCard } from '../common/SourceCard'
import { useRecentBlogPosts } from './useRecentBlogPosts'

const BlogPostsSectionHeader = () => {
	return (
		<div
			className={classNames(
				'flex items-center justify-between',
				/* Hack to make left side of header match with content's starting point */
				'py-2 md:px-5 lg:px-3'
			)}
		>
			<h6 className="text-gray-800 text-sm uppercase font-bold">{'recent blog posts'}</h6>
			<Link href="/articles/all">
				<a
					className={classNames(
						'hover:underline',
						'uppercase text-primary-500 font-semibold text-sm',
						'px-3 py-1 md:py-2',
						'cursor-pointer rounded-md'
					)}
				>
					{'view all'}
				</a>
			</Link>
		</div>
	)
}

const BlogPostsSectionFeed = () => {
	const { data: recentBlogPosts, isLoading } = useRecentBlogPosts({ limit: 3 })

	return (
		<div
			className={classNames(
				'grid grid-cols-1 md:grid-cols-3',
				/* Center each card within its space  */
				'content-center',
				/* Vertical spacing */
				'space-y-2 md:space-y-0',
				/* Horizontal spacing */
				'space-x-0 md:space-x-4'
			)}
		>
			{isLoading && <div>Loading...</div>}
			{recentBlogPosts?.map((blogPost) => (
				<li className="m-0 p-0" key={blogPost.id}>
					<SourceCard {...blogPost} />
				</li>
			))}
		</div>
	)
}

export const BlogPostsSection = () => {
	return (
		<div className="grid space-y-2">
			{/* Section header */}
			<BlogPostsSectionHeader />
			{/* Section content below header */}
			<BlogPostsSectionFeed />
		</div>
	)
}
