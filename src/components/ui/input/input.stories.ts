import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './index.ts'

const meta = {
  title: 'Components/Input',
  component: Input,
  id: 'components-input-field',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['standard', 'password', 'search'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    label: 'Just a label',
    variant: 'standard',
    placeholder: 'Input',
    disabled: false,
  },
}

export const StandardWithError: Story = {
  args: {
    errormessage: 'Enter a valid email',
    label: 'Login or email',
    variant: 'standard',
    placeholder: 'Enter your login of email',
    disabled: false,
  },
}

export const Password: Story = {
  args: {
    required: true,
    label: 'Password',
    variant: 'password',
    placeholder: 'Enter your password',
    disabled: false,
  },
}

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: 'Type in for search',
    disabled: false,
  },
}
