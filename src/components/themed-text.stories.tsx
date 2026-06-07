import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { ThemedText } from './themed-text';

const meta = {
  title: 'Components/ThemedText',
  component: ThemedText,
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ThemedText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default body text',
  },
};

export const Title: Story = {
  args: {
    type: 'title',
    children: 'Title',
  },
};

export const Subtitle: Story = {
  args: {
    type: 'subtitle',
    children: 'Subtitle',
  },
};

export const Code: Story = {
  args: {
    type: 'code',
    children: 'src/app/index.tsx',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    children: 'Learn more',
  },
};

export const LinkPrimary: Story = {
  args: {
    type: 'linkPrimary',
    children: 'Primary link',
  },
};
