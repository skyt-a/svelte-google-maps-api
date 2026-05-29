import type { Meta, StoryObj } from '@storybook/svelte';
import { StreetViewService } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/StreetViewService',
	component: StreetViewService,
	tags: ['autodocs']
} satisfies Meta<typeof StreetViewService>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'StreetViewService' }
	})
};
