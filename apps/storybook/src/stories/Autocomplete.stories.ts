import type { Meta, StoryObj } from '@storybook/svelte';
import { Autocomplete } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Autocomplete',
	component: Autocomplete,
	tags: ['autodocs']
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Autocomplete' }
	})
};
