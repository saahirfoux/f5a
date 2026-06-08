import type { Meta, StoryObj } from '@storybook/react-native';

import { SessionSummaryBar } from '@/components/session/session-summary-bar';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/SessionSummaryBar',
  component: SessionSummaryBar,
  decorators: [sessionStoryDecorator],
  args: {
    votedCount: 0,
    expectedCount: 12,
    dominantScore: null,
    compact: false,
  },
  argTypes: {
    dominantScore: { control: false },
  },
} satisfies Meta<typeof SessionSummaryBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PartyResume: Story = {
  args: {
    votedCount: 8,
    expectedCount: 12,
    dominantScore: 5,
  },
};

export const StandupPartial: Story = {
  args: {
    votedCount: 4,
    expectedCount: 5,
    dominantScore: 5,
  },
};

export const NoVotesYet: Story = {
  args: {
    votedCount: 0,
    expectedCount: 12,
    dominantScore: null,
  },
};
