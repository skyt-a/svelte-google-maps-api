import type { Meta, StoryObj } from '@storybook/svelte';
import { PlaceAutocomplete } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/PlaceAutocomplete',
	component: PlaceAutocomplete,
	tags: ['autodocs']
} satisfies Meta<typeof PlaceAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'PlaceAutocomplete' }
	})
};
