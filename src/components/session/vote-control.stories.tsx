import type { Meta, StoryObj } from '@storybook/react-native';

import { sessionStoryDecorator } from '@/components/session/story-decorator';
import { VoteControl } from '@/components/session/vote-control';

const meta = {
  title: 'Session/VoteControl',
  component: VoteControl,
  decorators: [sessionStoryDecorator],
  argTypes: {
    handedness: { control: 'radio', options: ['right', 'left'] },
    layout: { control: 'radio', options: ['thumbArc', 'slider', 'row'] },
    selectedVote: { control: { type: 'number', min: 1, max: 5, step: 1 } },
  },
} satisfies Meta<typeof VoteControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThumbArcEmpty: Story = {
  args: {
    selectedVote: null,
    disabled: false,
    layout: 'thumbArc',
    handedness: 'right',
  },
};

export const ThumbArcSelectedThree: Story = {
  args: {
    selectedVote: 3,
    disabled: false,
    layout: 'thumbArc',
    handedness: 'right',
  },
};

export const ThumbArcSelectedFive: Story = {
  args: {
    selectedVote: 5,
    disabled: false,
    layout: 'thumbArc',
    handedness: 'right',
  },
};

export const ThumbArcSelectedOne: Story = {
  args: {
    selectedVote: 1,
    disabled: false,
    layout: 'thumbArc',
    handedness: 'right',
  },
};

export const ThumbArcDisabled: Story = {
  args: {
    selectedVote: null,
    disabled: true,
    layout: 'thumbArc',
    handedness: 'right',
  },
};

export const ThumbArcLeftHanded: Story = {
  args: {
    selectedVote: 4,
    disabled: false,
    layout: 'thumbArc',
    handedness: 'left',
  },
};

export const LegacyRow: Story = {
  args: {
    selectedVote: 4,
    disabled: false,
    layout: 'row',
    handedness: 'right',
  },
};

export const SliderEmpty: Story = {
  args: {
    selectedVote: null,
    disabled: false,
    layout: 'slider',
  },
};

export const SliderSelectedFour: Story = {
  args: {
    selectedVote: 4,
    disabled: false,
    layout: 'slider',
  },
};

export const SliderSelectedOne: Story = {
  args: {
    selectedVote: 1,
    disabled: false,
    layout: 'slider',
  },
};

export const SliderDisabled: Story = {
  args: {
    selectedVote: 3,
    disabled: true,
    layout: 'slider',
  },
};
