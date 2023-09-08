import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupComponet } from './radio-group'

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroupComponet,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupComponet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}

export const Disabled: Story = {
  args: {
    options: [
      { label: 'Option One', value: 'option-one' },
      { label: 'Option Two', value: 'option-two' },
    ],
  },
}
