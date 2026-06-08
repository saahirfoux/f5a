import type { Meta, StoryObj } from '@storybook/react-native';

import { RealtimeBanner } from '@/components/session/realtime-banner';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/RealtimeBanner',
  component: RealtimeBanner,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof RealtimeBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Takeover: Story = {
  args: { variant: 'takeover' },
};

export const TopicChange: Story = {
  args: { variant: 'topic-change' },
};

export const Disconnect: Story = {
  args: { variant: 'disconnect' },
};

export const SessionEnd: Story = {
  args: { variant: 'session-end' },
};
