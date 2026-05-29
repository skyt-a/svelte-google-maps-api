import type { Meta, StoryObj } from '@storybook/svelte';
import { BicyclingLayer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/BicyclingLayer',
	component: BicyclingLayer,
	tags: ['autodocs']
} satisfies Meta<typeof BicyclingLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'BicyclingLayer' }
	})
};
