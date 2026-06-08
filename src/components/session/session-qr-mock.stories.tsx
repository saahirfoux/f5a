import type { Meta, StoryObj } from '@storybook/react-native';

import { SessionQrMock } from '@/components/session/session-qr-mock';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/SessionQrMock',
  component: SessionQrMock,
  decorators: [sessionStoryDecorator],
  args: {
    size: 160,
  },
} satisfies Meta<typeof SessionQrMock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 200 },
};
