import type { Meta, StoryObj } from '@storybook/react-native';

import { partySpreadMajority, standupSpread } from '@/components/session/mock-data';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/SpreadSummaryBar',
  component: SpreadSummaryBar,
  decorators: [sessionStoryDecorator],
  args: {
    counts: standupSpread,
    votedCount: 0,
    expectedCount: 5,
    highlightMajority: true,
  },
  argTypes: {
    counts: { control: false },
  },
} satisfies Meta<typeof SpreadSummaryBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandupSpread: Story = {
  args: {
    counts: standupSpread,
    votedCount: 4,
    expectedCount: 5,
    highlightMajority: true,
  },
};

export const PartyPartialTurnout: Story = {
  args: {
    counts: partySpreadMajority,
    votedCount: 3,
    expectedCount: 12,
    highlightMajority: true,
  },
};

export const NoMajorityHighlight: Story = {
  args: {
    counts: standupSpread,
    votedCount: 4,
    expectedCount: 5,
    highlightMajority: false,
  },
};
