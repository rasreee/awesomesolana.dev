import { css, Interpolation, Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import * as React from 'react'
import { FC, forwardRef, InputHTMLAttributes, ReactElement, Ref } from 'react'

import { spacing } from '@/ui/foundations'
import { inputOutline } from '@/ui/mixins'
import { StyledProps } from '@/ui/styled'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Emotion style object to overwrite the input element styles.
	 */
	inputStyles?: Interpolation<Theme>
	/**
	 * Emotion style object to overwrite the input label element styles.
	 */
	labelStyles?: Interpolation<Theme>
	/**
	 * Render prop that should render a left-aligned overlay icon or element.
	 * Receives a className prop.
	 */
	renderPrefix?: FC<{ className?: string }>
	/**
	 * Render prop that should render a right-aligned overlay icon or element.
	 * Receives a className prop.
	 */
	renderSuffix?: FC<{ className?: string }>
	/**
	 * The ref to the HTML DOM element
	 */
	ref?: Ref<HTMLInputElement>
}

type InputElProps = Omit<InputProps, 'label'> & {
	hasPrefix: boolean
	hasSuffix: boolean
}

const inputBaseStyles = ({ theme }: StyledProps) => css`
	-webkit-appearance: none;
	background-color: ${theme.colors.white};
	font-size: ${theme.fontSizes.sm};
	border: none;
	outline: none;
	border-radius: ${theme.radii.md};
	padding: ${spacing(3, 4)};
	transition: box-shadow ${theme.transitions.default}, padding ${theme.transitions.default};
	width: 100%;
	margin: 0;

	&::placeholder {
		color: ${theme.colors.gray};
		transition: color ${theme.transitions.default};
	}
`

const inputContainerDisabledStyles = ({ theme, disabled }: StyledProps & InputElProps) =>
	disabled &&
	css`
		background-color: ${theme.colors.lightGray};
	`

const inputPrefixStyles = ({ theme, hasPrefix }: StyledProps & InputElProps) =>
	hasPrefix &&
	css`
		padding-left: ${spacing(2)};
	`

const inputSuffixStyles = ({ theme, hasSuffix }: StyledProps & InputElProps) =>
	hasSuffix &&
	css`
		padding-right: ${spacing(2)};
	`

const InputElement = styled('input')<InputElProps>(inputBaseStyles, inputPrefixStyles, inputSuffixStyles)

const containerBaseStyles = ({ theme }: StyledProps) => css`
	position: relative;
	display: flex;
	align-items: center;
	background: ${theme.colors.white};
`

const containerShapeStyles = ({ theme }: StyledProps) =>
	css`
		border-radius: ${theme.radii.md};
	`

const InputContainer = styled('div')(
	containerBaseStyles,
	inputContainerDisabledStyles,
	inputOutline,
	containerShapeStyles
)

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const prefixStyles = (theme: Theme) => css`
	position: absolute;
	left: ${spacing(3)};
	pointer-events: none;
	color: ${theme.colors.text};
	padding: ${spacing(1)};
	height: 1.5em;
`

/**
 * Used with css prop directly, so it does not require prop
 * destructuring.
 */
const suffixStyles = (theme: Theme) => css`
	position: absolute;
	top: 0;
	right: 0;
	pointer-events: none;
	color: ${darken(2, theme.colors.gray)};
	padding: ${spacing(3, 4)};
	height: ${spacing(12)};
	width: ${spacing(12)};
	transition: right ${theme.transitions.default};
`

export const Input = forwardRef(
	(
		{ renderPrefix: RenderPrefix, renderSuffix: RenderSuffix, inputStyles, ...props }: InputProps,
		ref: InputProps['ref']
	): ReactElement<any, any> | null => {
		const prefix = RenderPrefix && <RenderPrefix css={prefixStyles} />
		const suffix = RenderSuffix && <RenderSuffix css={suffixStyles} />

		const hasPrefix = Boolean(prefix)
		const hasSuffix = Boolean(suffix)

		return (
			<InputContainer {...{ hasPrefix, hasSuffix }}>
				{prefix}
				<InputElement {...{ ref, hasPrefix, hasSuffix }} css={inputStyles} {...props} />
				{suffix}
			</InputContainer>
		)
	}
)

Input.displayName = 'Input'
