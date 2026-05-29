import type { Meta, StoryObj } from '@storybook/svelte';
import { Circle } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Circle',
	component: Circle,
	tags: ['autodocs']
} satisfies Meta<typeof Circle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Circle' }
	})
};
