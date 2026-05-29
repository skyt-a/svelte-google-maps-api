import type { Meta, StoryObj } from '@storybook/svelte';
import { GoogleMarkerClusterer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/GoogleMarkerClusterer',
	component: GoogleMarkerClusterer,
	tags: ['autodocs']
} satisfies Meta<typeof GoogleMarkerClusterer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'GoogleMarkerClusterer' }
	})
};
