import type { Meta, StoryObj } from '@storybook/svelte';
import { Polyline } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Polyline',
	component: Polyline,
	tags: ['autodocs']
} satisfies Meta<typeof Polyline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Polyline' }
	})
};
