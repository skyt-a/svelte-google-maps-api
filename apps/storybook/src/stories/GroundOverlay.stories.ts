import type { Meta, StoryObj } from '@storybook/svelte';
import { GroundOverlay } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/GroundOverlay',
	component: GroundOverlay,
	tags: ['autodocs'],
	// The story renders ComponentStory; these only satisfy required props.
	args: { url: '', bounds: { north: 0, south: 0, east: 0, west: 0 } }
} satisfies Meta<typeof GroundOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'GroundOverlay' }
	})
};
