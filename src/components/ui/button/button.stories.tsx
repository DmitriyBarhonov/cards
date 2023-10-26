import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './'

import { DotsInCircle } from '@/assets/icons/dots-in-circle.tsx'
import { EdittextIcon } from '@/assets/icons/edit-text.tsx'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link', 'icon'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
    disabled: false,
  },
}
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Tertiary Button',
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
  },
}
export const AsLink: Story = {
  args: {
    variant: 'primary',
    children: 'Link that looks like a button',
    as: 'a',
  },
}
export const Icon: Story = {
  args: {
    variant: 'icon',
    children: <DotsInCircle />,
  },
}
export const TextWithIconIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <EdittextIcon />
        Button with icon
      </>
    ),
  },
}
