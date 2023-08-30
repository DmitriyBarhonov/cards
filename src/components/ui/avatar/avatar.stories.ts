import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithPhoto: Story = {
  args: {
    avatar: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=8',
    name: 'Victoria Pavlova',
  },
}

export const WithoutPhoto: Story = {
  args: {
    avatar: '',
    name: 'Victoria Pavlova',
  },
}
