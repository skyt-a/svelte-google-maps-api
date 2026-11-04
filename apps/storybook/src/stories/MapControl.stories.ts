import type { Meta, StoryObj } from '@storybook/svelte';
import { MapControl } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/MapControl',
	component: MapControl,
	tags: ['autodocs'],
	// The story renders ComponentStory; these only satisfy required props.
	args: { position: 'TOP_LEFT' }
} satisfies Meta<typeof MapControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'MapControl' }
	})
};
