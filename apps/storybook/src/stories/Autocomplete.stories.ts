import type { Meta, StoryObj } from '@storybook/svelte';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Autocomplete',
	component: ComponentStory,
	args: { componentName: 'Autocomplete' }
} satisfies Meta<typeof ComponentStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
