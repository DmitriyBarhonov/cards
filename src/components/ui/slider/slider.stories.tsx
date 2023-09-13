import type { Meta, StoryObj } from '@storybook/react'

import { SliderForCards } from '@/components/ui/slider/slider.tsx'

const meta = {
  title: 'Components/Slider',
  component: SliderForCards,
  tags: ['autodocs'],
} satisfies Meta<typeof SliderForCards>

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
