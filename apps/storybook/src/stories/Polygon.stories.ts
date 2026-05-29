import type { Meta, StoryObj } from '@storybook/svelte';
import { Polygon } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Polygon',
	component: Polygon,
	tags: ['autodocs']
} satisfies Meta<typeof Polygon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Polygon' }
	})
};
