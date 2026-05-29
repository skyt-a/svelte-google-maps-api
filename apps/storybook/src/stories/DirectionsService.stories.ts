import type { Meta, StoryObj } from '@storybook/svelte';
import { DirectionsService } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/DirectionsService',
	component: DirectionsService,
	tags: ['autodocs']
} satisfies Meta<typeof DirectionsService>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'DirectionsService' }
	})
};
