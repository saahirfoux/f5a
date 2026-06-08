import type { Meta, StoryObj } from '@storybook/react-native';

import { LiveVoteRoster } from '@/components/session/live-vote-roster';
import { partyRosterPartial, standupRoster } from '@/components/session/mock-data';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/LiveVoteRoster',
  component: LiveVoteRoster,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof LiveVoteRoster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IdentifiedStandup: Story = {
  args: {
    entries: standupRoster,
    anonymousMode: false,
  },
};

export const IdentifiedWithPending: Story = {
  args: {
    entries: partyRosterPartial,
    anonymousMode: false,
  },
};

export const AnonymousAggregate: Story = {
  args: {
    entries: partyRosterPartial,
    anonymousMode: true,
  },
};
