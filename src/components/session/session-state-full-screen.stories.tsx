import type { Meta, StoryObj } from '@storybook/react-native';

import { SessionStateFullScreen } from '@/components/session/session-state-full-screen';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/SessionStateFullScreen',
  component: SessionStateFullScreen,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof SessionStateFullScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scheduled: Story = {
  args: {
    variant: 'scheduled',
    scheduledAt: '9:00 AM',
  },
};

export const SessionOver: Story = {
  args: {
    variant: 'session-over',
  },
};
