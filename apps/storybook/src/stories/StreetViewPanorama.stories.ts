import type { Meta, StoryObj } from '@storybook/svelte';
import { StreetViewPanorama } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/StreetViewPanorama',
	component: StreetViewPanorama,
	tags: ['autodocs']
} satisfies Meta<typeof StreetViewPanorama>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'StreetViewPanorama' }
	})
};
