// Search.stories.ts|tsx

import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Search } from './Search'

export default {
	title: 'Search',
	component: Search
} as ComponentMeta<typeof Search>

export const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />
