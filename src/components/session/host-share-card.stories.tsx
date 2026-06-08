import type { Meta, StoryObj } from '@storybook/react-native';

import { HostShareCard } from '@/components/session/host-share-card';
import { MOCK_JOIN_URL } from '@/components/session/mock-data';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/HostShareCard',
  component: HostShareCard,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof HostShareCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    joinUrl: MOCK_JOIN_URL,
  },
};

export const Disabled: Story = {
  args: {
    joinUrl: MOCK_JOIN_URL,
    disabled: true,
  },
};
