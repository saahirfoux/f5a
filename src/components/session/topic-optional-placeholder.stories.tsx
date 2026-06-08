import type { Meta, StoryObj } from '@storybook/react-native';

import { TopicOptionalPlaceholder } from '@/components/session/topic-optional-placeholder';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/TopicOptionalPlaceholder',
  component: TopicOptionalPlaceholder,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof TopicOptionalPlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomHint: Story = {
  args: {
    hint: 'Shout the pizza question to the room — guests will know what to vote on',
  },
};
