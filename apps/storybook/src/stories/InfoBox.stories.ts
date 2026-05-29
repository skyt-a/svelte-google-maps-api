import type { Meta, StoryObj } from '@storybook/svelte';
import { InfoBox } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/InfoBox',
	component: InfoBox,
	tags: ['autodocs']
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'InfoBox' }
	})
};
