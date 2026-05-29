import type { Meta, StoryObj } from '@storybook/svelte';
import { DistanceMatrixService } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/DistanceMatrixService',
	component: DistanceMatrixService,
	tags: ['autodocs']
} satisfies Meta<typeof DistanceMatrixService>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'DistanceMatrixService' }
	})
};
