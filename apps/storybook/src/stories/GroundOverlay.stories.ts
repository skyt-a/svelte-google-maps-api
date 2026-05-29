import type { Meta, StoryObj } from '@storybook/svelte';
import { GroundOverlay } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/GroundOverlay',
	component: GroundOverlay,
	tags: ['autodocs']
} satisfies Meta<typeof GroundOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'GroundOverlay' }
	})
};
