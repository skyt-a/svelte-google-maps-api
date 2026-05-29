import type { Meta, StoryObj } from '@storybook/svelte';
import { MarkerClusterer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/MarkerClusterer',
	component: MarkerClusterer,
	tags: ['autodocs']
} satisfies Meta<typeof MarkerClusterer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'MarkerClusterer' }
	})
};
