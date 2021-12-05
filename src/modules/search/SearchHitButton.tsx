import { css } from '@emotion/react'
import { darken } from 'polished'
import { FC, HTMLAttributes } from 'react'

import { Tag } from '@/models/tag'
import { pseudo } from '@/ui/helpers'
import styled from '@/ui/styled'

export interface SearchHitButtonProps extends HTMLAttributes<HTMLButtonElement> {
	hit: Tag
}

const StyledSearchHitButton = styled.button`
	display: flex;
	align-items: center;
	width: 100%;
	height: 4rem;
	border: 0;
	border-radius: 0.5rem;
	box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
	padding: 0 1.25rem 0 1rem;
	margin: 0.25rem 0;

	${({ theme }) => css`
		font-weight: ${theme.fontWeights.semibold};
		background: ${theme.colors.lightest};
		${pseudo('_hover')} {
			background: ${theme.colors.accent};
			color: white;
			box-shadow: ${theme.shadows.md};
		}

		${pseudo('_active')} {
			background: ${darken('0.1', theme.colors.accent)};
			color: white;
			box-shadow: ${theme.shadows.md};
		}
	`}
`

export const SearchHitButton: FC<SearchHitButtonProps> = ({ onClick, hit }) => {
	return <StyledSearchHitButton onClick={onClick}>{hit.name}</StyledSearchHitButton>
}
