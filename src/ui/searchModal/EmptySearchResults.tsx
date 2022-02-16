import styled from '@emotion/styled';

const EmptySearchResults = () => (
  <Container>
    <span className="text-semibold text-lg text-gray-800 dark:text-base-200">
      No results found
    </span>
    <span className="text-gray-800 dark:text-base-200 dark:opacity-70">
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
