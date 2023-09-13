import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/components/ui/tab-switcher/tab-switcher.tsx'

const meta = {
  title: 'Components/Tab Switcher',
  component: TabSwitcher,
  tags: ['autodocs'],
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: 'My Cards', value: 'my-cards' },
      { label: 'All Cards', value: 'all-cards' },
    ],
    disabled: true,
    defaultValue: 'all-cards',
  },
}
