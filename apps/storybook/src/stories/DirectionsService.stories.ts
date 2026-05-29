import type { Meta, StoryObj } from '@storybook/svelte';
import ComponentStory from './ComponentStory.svelte';

const meta = {
	title: 'Components/DirectionsService',
	component: ComponentStory,
	args: { componentName: 'DirectionsService' }
} satisfies Meta<typeof ComponentStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
