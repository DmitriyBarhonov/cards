import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'body2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
        'error',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: `Large typography ${lorem}`,
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    children: `h1 - ${lorem}`,
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    children: `h2 - ${lorem}`,
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: `h3 - ${lorem}`,
  },
}

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: `body1 - ${lorem}`,
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: `body2 - ${lorem}`,
  },
}

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: `subtitle1 - ${lorem}`,
  },
}
export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: `subtitle2 - ${lorem}`,
  },
}
export const Caption: Story = {
  args: {
    variant: 'caption',
    children: `caption - ${lorem}`,
  },
}
export const Overline: Story = {
  args: {
    variant: 'overline',
    children: `overline - ${lorem}`,
  },
}

export const Link1: Story = {
  args: {
    variant: 'link1',
    children: `link1 - ${lorem}`,
  },
}
export const Link2: Story = {
  args: {
    variant: 'link2',
    children: `link2 - ${lorem}`,
  },
}
export const Error: Story = {
  args: {
    variant: 'error',
    children: `error - ${lorem}`,
  },
}
