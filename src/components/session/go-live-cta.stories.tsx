import type { Meta, StoryObj } from '@storybook/react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/GoLiveCTA',
  component: GoLiveCTA,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof GoLiveCTA>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Loading: Story = {
  args: {
    variant: 'loading',
  },
};

export const ResumeActive: Story = {
  args: {
    variant: 'resume-active',
    activeSessionLabel: 'Pizza vote',
  },
};
