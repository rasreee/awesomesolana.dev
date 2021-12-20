import React from "react";

import { AppProviders } from '@/app/AppProviders';
import { addDecorator } from "@storybook/react";

export const parameters = {
	actions: {
		argTypesRegex: '^on[A-Z].*',

		/**
		 * Since Controls is built on the same engine as Storybook Docs, it can also show property documentation alongside your controls using the expanded parameter (defaults to false).
		 * We enable this for all stories by default.
		 *
		 * @see https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
		 */
		expanded: true,
	},
}


addDecorator((storyFn) => (
	<AppProviders>
			{storyFn()}
	</AppProviders>
));