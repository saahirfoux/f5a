import type { Meta, StoryObj } from '@storybook/react-native';

import { SessionListRow } from '@/components/session/session-list-row';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/SessionListRow',
  component: SessionListRow,
  decorators: [sessionStoryDecorator],
  args: {
    title: 'Session title',
    subtitle: 'Jun 2, 2026',
    voteCount: 0,
    unreadVotes: 0,
    variant: 'default',
  },
  argTypes: {
    onPress: { control: false },
    onRename: { control: false },
    onDelete: { control: false },
  },
} satisfies Meta<typeof SessionListRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Weekly video #47 — Best pizza toppings?',
    subtitle: 'Jun 2, 2026',
    voteCount: 12,
  },
};

export const UnreadBadge: Story = {
  args: {
    title: 'Weekly video #47 — Best pizza toppings?',
    subtitle: 'Jun 2, 2026',
    voteCount: 12,
    unreadVotes: 3,
    variant: 'unread',
  },
};

export const Editing: Story = {
  args: {
    title: 'Weekly video #47 — Best pizza toppings?',
    subtitle: 'Jun 2, 2026',
    voteCount: 12,
    variant: 'editing',
  },
};

export const ZeroVotes: Story = {
  args: {
    title: 'Weekly video #45 — Remote work tips',
    subtitle: 'May 19, 2026',
    voteCount: 0,
    onDelete: () => {},
  },
};
