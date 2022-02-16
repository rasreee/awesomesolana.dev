import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { PlainButton } from '@/ui/buttons';

interface SearchResultProps {
  onClick: () => void;
  children: ReactNode;
}

const SearchResult = ({ children, onClick }: SearchResultProps) => {
  return <SPlainButton onClick={onClick}>{children}</SPlainButton>;
};

const SPlainButton = styled(PlainButton)`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1.25rem;
  height: 3.25rem;
  ${({ theme }) =>
    css`
      color: ${theme.colors.gray[800]};
    `}
`;

export default SearchResult;
