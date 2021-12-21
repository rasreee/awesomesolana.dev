import styled from '@/styled'

export const Dropdown = styled.div`
	flex: 1 1 auto;
	overflow: auto;
`

export const HitsSection = styled.section`
	padding-bottom: 1.5rem;
`

export const HitsSectionTitle = styled.div`
	line-height: 1.5rem;
	font-weight: var(--font-semibold);
	color: var(--gray-800);
	margin: 0 1.5rem 1rem;
`

export const HitList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 40px;

	border-top-width: 1px;
	border-color: var(--gray-100);
`

export const HitListItem = styled.li`
	position: relative;
`

export const HitItemButton = styled.button`
	:first-child {
		border-top-width: 1px;
		border-color: var(--gray-100);
	}
	padding: 1rem 1.5rem;
	font-size: 0.875rem;
	border-bottom: 1px solid var(--gray-100);
	color: inherit;
	text-decoration: inherit;
`
