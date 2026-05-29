import type { Meta, StoryObj } from '@storybook/svelte';
import { GoogleMap } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/GoogleMap',
	component: GoogleMap,
	tags: ['autodocs']
} satisfies Meta<typeof GoogleMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'GoogleMap' }
	})
};
