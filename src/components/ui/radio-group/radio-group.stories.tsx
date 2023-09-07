import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from './radio-group'

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroupDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupDemo>

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
