import type { Meta, StoryObj } from '@storybook/svelte';
import { StandaloneSearchBox } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/StandaloneSearchBox',
	component: StandaloneSearchBox,
	tags: ['autodocs']
} satisfies Meta<typeof StandaloneSearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'StandaloneSearchBox' }
	})
};
