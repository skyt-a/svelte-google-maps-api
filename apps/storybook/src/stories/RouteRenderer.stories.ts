import type { Meta, StoryObj } from '@storybook/svelte';
import { RouteRenderer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/RouteRenderer',
	component: RouteRenderer,
	tags: ['autodocs'],
	// The story renders ComponentStory; these only satisfy required props.
	args: { route: null }
} satisfies Meta<typeof RouteRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'RouteRenderer' }
	})
};
