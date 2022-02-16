import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { pseudo } from '@/lib/pseudo';
import { baseButtonStyles } from '@/ui/buttons';

import { KbdSymbols } from './kbdSymbols';
import { useSearchModal } from './SearchModalContext';

const SearchModalToggle = () => {
  const searchModal = useSearchModal();

  return (
    <Button onClick={searchModal.onRequestOpen}>
      <span>Quick search...</span>
      <Kbd className="bg-base-200 dark:bg-base-800">
        <span>{KbdSymbols.CMD}</span>
        <span>K</span>
      </Kbd>
    </Button>
  );
};

const Button = styled('button')(
  baseButtonStyles,
  ({ theme }) =>
    css`
      ${pseudo('_hover')} {
        background: ${theme.colors.gray[100]};
      }
      ${pseudo('_active')} {
        background: ${theme.colors.gray[200]};
      }
    `,
  ({ theme }) => css`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    min-width: 20vw;
    padding: 0.75rem 1.25rem;
    border-radius: ${theme.radii.md};
    border: 1px solid ${theme.colors.gray[200]};
  `,
);

const Kbd = styled.kbd`
  font-family: sans-serif;
  padding: 0.25rem 0.375rem;
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  ${({ theme }) =>
    css`
      border-radius: ${theme.radii.base};
      font-size: ${theme.fontSizes.sm};
      font-weight: ${theme.fontWeights.medium};
      color: ${theme.colors.gray[400]};
    `}
`;

export default SearchModalToggle;
