import type { Meta, StoryObj } from '@storybook/react-native';

import { JoinLink } from '@/components/session/join-link';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/JoinLink',
  component: JoinLink,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof JoinLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
