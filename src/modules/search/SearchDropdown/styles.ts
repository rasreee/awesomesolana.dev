import styled from '@/styled'

export const Dropdown = styled.div`
	flex: 1 1 auto;
	overflow: auto;
`

export const Section = styled.section`
	padding-bottom: 1.5rem;
`

export const SectionTitle = styled.div`
	line-height: 1.5rem;
	font-weight: var(--font-semibold);
	color: var(--gray-800);
	margin: 0 1.5rem 1rem;
`

export const List = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;

	border-top-width: 1px;
	border-color: var(--gray-100);
`

export const ListItem = styled.li`
	list-style: none;
	position: relative;
`

export const ItemButton = styled.button`
	:first-child {
		border-top-width: 1px;
		border-color: var(--gray-100);
	}
	padding: 1rem 1.5rem;
	font-size: 0.875rem;
	border-bottom: 1px solid var(--gray-100);
	color: inherit;
	text-decoration: inherit;

	display: flex;
	align-items: center;
`
