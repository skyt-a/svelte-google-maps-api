import type { Meta, StoryObj } from '@storybook/svelte';
import { KmlLayer } from 'svelte-google-maps-api';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/KmlLayer',
	component: KmlLayer,
	tags: ['autodocs']
} satisfies Meta<typeof KmlLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	render: () => ({
		Component: ComponentStory,
		props: { componentName: 'KmlLayer' }
	})
};
