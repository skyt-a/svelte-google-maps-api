import type { Meta, StoryObj } from '@storybook/svelte';
import { DirectionsRenderer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/DirectionsRenderer',
	component: DirectionsRenderer,
	tags: ['autodocs']
} satisfies Meta<typeof DirectionsRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'DirectionsRenderer' }
	})
};
