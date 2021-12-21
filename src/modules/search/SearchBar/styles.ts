import { pseudo } from '@/common/utils/pseudos'
import styled from '@/styled'

export const Container = styled.header`
	position: relative;
	z-index: 1;
	display: flex;
	flex: none;
	padding: 0 1rem;
	align-items: center;
	border-color: var(--gray-100);
`

export const Form = styled.form`
	display: flex;
	align-items: center;
	flex: 1 1 auto;
	min-width: 0;
`

export const Label = styled.label`
	height: 1.5rem;
	width: 1.5rem;
	flex: none;
	svg {
		pseudodisplay: none;
		vertical-align: middle;
	}
`

export const Input = styled.input`
	border: none;
	outline: none;
	font-size: 0.875rem;
	background: transparent;
	height: 3.5rem;
	color: var(--gray-800);
	${pseudo('_placeholder')} {
		color: var(--gray-400);
	}
	margin-left: 0.75rem;
	margin-right: 1rem;
	flex: auto;
	min-width: 0;
`
