import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEventHandler } from 'react';

import { useInputFocus } from '@/hooks/useInputFocus';
import { below } from '@/lib/breakpoints';
import Spinner from '@/ui/progress/Spinner';

import SearchIcon from './SearchIcon';
import { useSearchModal } from './SearchModalContext';

const SearchBar = () => {
  const { query, setQuery, isRequesting } = useSearchModal();

  const { isFocused, ...bindInput } = useInputFocus(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setQuery(event.currentTarget.value);

  return (
    <SContainer isFocused={isFocused}>
      {isRequesting ? (
        <Spinner />
      ) : (
        <SLabel htmlFor="search">
          <SearchIcon />
        </SLabel>
      )}
      <SInput
        type="search"
        name="search"
        placeholder="Search"
        value={query}
        onChange={handleChange}
        {...bindInput}
      />
    </SContainer>
  );
};

const SContainer = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.125rem 0.75rem;

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.gray[200]};
    svg {
      color: ${theme.colors.gray[400]};
    }
  `}

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      svg {
        color: ${theme.colors.blue[600]};
      }
    `}
`;

const SLabel = styled.label`
  height: 1.5rem;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SInput = styled.input`
  display: block;
  width: 100%;
  border: none !important;
  line-height: 1;

  ${({ theme }) => css`
    color: ${theme.colors.gray[800]};
    font-size: ${theme.fontSizes.lg};

    ${below('tablet')} {
      font-size: ${theme.fontSizes.base};
    }
  `}
`;

export default SearchBar;
