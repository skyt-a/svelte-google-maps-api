import type { Meta, StoryObj } from '@storybook/svelte';
import { Rectangle } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Rectangle',
	component: Rectangle,
	tags: ['autodocs']
} satisfies Meta<typeof Rectangle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Rectangle' }
	})
};
