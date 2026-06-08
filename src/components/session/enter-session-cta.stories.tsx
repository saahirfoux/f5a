import type { Meta, StoryObj } from '@storybook/react-native';

import { EnterSessionCTA } from '@/components/session/enter-session-cta';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/EnterSessionCTA',
  component: EnterSessionCTA,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof EnterSessionCTA>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { variant: 'loading' },
};

export const Entered: Story = {
  args: { variant: 'entered' },
};
