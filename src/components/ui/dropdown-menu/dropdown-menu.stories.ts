import type { Meta, StoryObj } from '@storybook/react'

// @ts-ignore
import { Header } from './dropdown-menu.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    isAuth: {
      options: [true, false],
      control: { type: 'radio' },
    },
    name: [],
    avatar: [''],
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Authorized: Story = {
  args: {
    isAuth: true,
    avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=8',
    name: 'Victoria Pavlova',
  },
}

export const NotAuthorized: Story = {
  args: {
    isAuth: false,
  },
}
