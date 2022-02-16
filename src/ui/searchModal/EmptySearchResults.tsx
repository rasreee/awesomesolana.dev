import styled from '@emotion/styled';

const EmptySearchResults = () => (
  <Container className="text-gray-700 dark:text-base-200">
    <span className="text-lg font-medium">No results found</span>
    <span className="opacity-70">
      We can’t find anything with that term at the moment, try searching
      something else.
    </span>
  </Container>
);

const Container = styled.div`
  padding: 3.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
`;

export default EmptySearchResults;
