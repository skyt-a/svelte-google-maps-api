import type { Meta, StoryObj } from '@storybook/svelte';
import { InfoWindow } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/InfoWindow',
	component: InfoWindow,
	tags: ['autodocs']
} satisfies Meta<typeof InfoWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'InfoWindow' }
	})
};
