// Search.stories.ts|tsx

import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { SearchModal } from './SearchModal'

export default {
	title: 'SearchModal',
	component: SearchModal
} as ComponentMeta<typeof SearchModal>

export const Template: ComponentStory<typeof SearchModal> = (args) => <SearchModal {...args} isOpen={true} />
