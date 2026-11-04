import type { Meta, StoryObj } from '@storybook/svelte';
import { Pin } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Pin',
	component: Pin,
	tags: ['autodocs']
} satisfies Meta<typeof Pin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Pin' }
	})
};
