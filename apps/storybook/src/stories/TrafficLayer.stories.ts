import type { Meta, StoryObj } from '@storybook/svelte';
import { TrafficLayer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/TrafficLayer',
	component: TrafficLayer,
	tags: ['autodocs']
} satisfies Meta<typeof TrafficLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'TrafficLayer' }
	})
};
