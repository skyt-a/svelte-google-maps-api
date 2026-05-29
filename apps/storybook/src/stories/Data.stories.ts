import type { Meta, StoryObj } from '@storybook/svelte';
import { Data } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/Data',
	component: Data,
	tags: ['autodocs']
} satisfies Meta<typeof Data>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'Data' }
	})
};
