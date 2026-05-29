import type { Meta, StoryObj } from '@storybook/svelte';
import { APIProvider } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/APIProvider',
	component: APIProvider,
	tags: ['autodocs']
} satisfies Meta<typeof APIProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'APIProvider' }
	})
};
