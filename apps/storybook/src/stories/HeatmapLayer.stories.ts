import type { Meta, StoryObj } from '@storybook/svelte';
import { HeatmapLayer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/HeatmapLayer',
	component: HeatmapLayer,
	tags: ['autodocs']
} satisfies Meta<typeof HeatmapLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'HeatmapLayer' }
	})
};
