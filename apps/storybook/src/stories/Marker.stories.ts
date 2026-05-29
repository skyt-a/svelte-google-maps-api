import type { Meta, StoryObj } from '@storybook/svelte';
import { Marker } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Marker',
	component: Marker,
	tags: ['autodocs']
} satisfies Meta<typeof Marker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Marker' }
	})
};
