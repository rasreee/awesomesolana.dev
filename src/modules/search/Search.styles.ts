import { pseudo } from '@/common/utils/pseudos'
import { only } from '@/common/utils/responsive'
import styled from '@/styled'

export const SearchBar = styled.header`
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
	min-width: 0;
	width: 100%;
	${only('md')} {
		width: 50%;
	}
	margin-left: auto;
	margin-right: auto;
	padding-left: 0.75rem /* 12px */;
	padding-right: 0.75rem /* 12px */;
	padding-top: 0.5rem /* 8px */;
	padding-bottom: 0.5rem /* 8px */;
	border-radius: 0.5rem /* 8px */;
	background: white;

	--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

	border-width: 1;
	border-color: var(--gray-300);
	${pseudo('_focusVisible')} {
		outline: none;
		--tw-ring-opacity: 1;
		--tw-ring-color: rgb(153 69 255 / var(--tw-ring-opacity));
		border-color: var(--primary-500);
	}
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
		color: var(--gray-300);
	}
	margin-left: 0.75rem;
	margin-right: 1rem;
	flex: auto;
	min-width: 0;
`

export const Dropdown = styled.div``
