import { css } from '@emotion/react';
import styled from '@emotion/styled';

import EmptySearchResults from './EmptySearchResults';
import { useSearchModal } from './SearchModalContext';
import SearchResult from './SearchResult';
import { SearchResultData } from './types';

const SearchResults = () => {
  const { hits, onSelect, isRequesting } = useSearchModal();

  const handleSelect = (selectedItem: SearchResultData) => () =>
    onSelect(selectedItem);

  if (isRequesting) return null;

  if (hits.length === 0)
    return (
      <SContainer>
        <EmptySearchResults />
      </SContainer>
    );

  return (
    <SContainer>
      <SList>
        {hits.map((searchResult: SearchResultData) => (
          <SItem key={searchResult.id}>
            <SearchResult
              key={searchResult.id}
              onClick={handleSelect(searchResult)}
            >
              {searchResult.title}
            </SearchResult>
          </SItem>
        ))}
      </SList>
    </SContainer>
  );
};

const SContainer = styled.div`
  ${({ theme }) =>
    css`
      background: ${theme.colors.gray[50]};
    `}
`;

const SList = styled.ul`
  padding: 0;
  margin: 0;
`;

const SItem = styled.li`
  list-style-type: none;
  ${({ theme }) =>
    css`
      border-top: 1px solid ${theme.colors.gray[200]};
    `}
`;

export default SearchResults;
