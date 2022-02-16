import { css, Global } from '@emotion/react';

import { overrideInputStyles, overrideScrollbarStyles } from './overrideStyles';

const globalStyles = css`
  ${overrideScrollbarStyles}
  ${overrideInputStyles}
`;

export default function GlobalStyles() {
  return <Global styles={globalStyles} />;
}
