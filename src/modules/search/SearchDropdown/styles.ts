import styled from '@/styled'

export const Dropdown = styled.div`
	flex: 1 1 auto;
	overflow: auto;
`

export const Content = styled.div`
	padding-bottom: 1.5rem;
`

export const Section = styled.section`
	width: 100%;
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
`

export const ListItem = styled.li`
	list-style: none;
	position: relative;

	:first-child {
		border-top-width: 1px;
		border-color: var(--gray-100);
	}
	border-bottom: 1px solid var(--gray-100);
`

export const ItemButton = styled.button`
	padding: 1rem 1.5rem;
	font-size: 0.875rem;
	color: inherit;
	text-decoration: inherit;

	display: flex;
	align-items: center;
`
