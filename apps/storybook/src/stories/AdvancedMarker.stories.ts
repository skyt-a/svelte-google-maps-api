import type { Meta, StoryObj } from '@storybook/svelte';
import { AdvancedMarker } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/AdvancedMarker',
	component: AdvancedMarker,
	tags: ['autodocs']
} satisfies Meta<typeof AdvancedMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'AdvancedMarker' }
	})
};
