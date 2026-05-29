import type { Meta, StoryObj } from '@storybook/svelte';
import { TransitLayer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/TransitLayer',
	component: TransitLayer,
	tags: ['autodocs']
} satisfies Meta<typeof TransitLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'TransitLayer' }
	})
};
