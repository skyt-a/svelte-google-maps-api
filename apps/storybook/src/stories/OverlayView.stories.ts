import type { Meta, StoryObj } from '@storybook/svelte';
import { OverlayView } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/OverlayView',
	component: OverlayView,
	tags: ['autodocs']
} satisfies Meta<typeof OverlayView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'OverlayView' }
	})
};
