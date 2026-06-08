import type { Meta, StoryObj } from '@storybook/react-native';

import { MOCK_PUBLIC_RESULTS_URL } from '@/components/session/mock-data';
import { PublicResultsLinkCard } from '@/components/session/public-results-link-card';
import { sessionStoryDecorator } from '@/components/session/story-decorator';

const meta = {
  title: 'Session/PublicResultsLinkCard',
  component: PublicResultsLinkCard,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof PublicResultsLinkCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    resultsUrl: MOCK_PUBLIC_RESULTS_URL,
    expiry: 'default',
  },
};

export const ExpiryHour: Story = {
  args: {
    resultsUrl: MOCK_PUBLIC_RESULTS_URL,
    expiry: 'hour',
  },
};

export const Disabled: Story = {
  args: {
    resultsUrl: MOCK_PUBLIC_RESULTS_URL,
    expiry: 'default',
    disabled: true,
  },
};
