import type { Meta, StoryObj } from '@storybook/react-native';

import { TOPIC_PARTY, TOPIC_STANDUP } from '@/components/session/mock-data';
import { sessionStoryDecorator } from '@/components/session/story-decorator';
import { TopicHeader } from '@/components/session/topic-header';

const meta = {
  title: 'Session/TopicHeader',
  component: TopicHeader,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof TopicHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { topic: TOPIC_STANDUP },
};

export const PartyTopic: Story = {
  args: { topic: TOPIC_PARTY },
};

export const TopicChanged: Story = {
  args: { topic: TOPIC_PARTY, highlightChange: true, announceChange: true },
};

export const Compact: Story = {
  args: { topic: TOPIC_STANDUP, compact: true },
};
