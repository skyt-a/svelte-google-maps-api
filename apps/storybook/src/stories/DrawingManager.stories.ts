import type { Meta, StoryObj } from '@storybook/svelte';
import { DrawingManager } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/DrawingManager',
	component: DrawingManager,
	tags: ['autodocs']
} satisfies Meta<typeof DrawingManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'DrawingManager' }
	})
};
