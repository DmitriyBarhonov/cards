import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown, Button, Avatar } from '@/components/ui'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Authorized: Story = {
  args: {
    trigger: <Avatar name={'Kilobuks Lover'} />,
    width: '200px',
    children: (
      <>
        <Button>Option 1</Button>
        <Button>Option 2</Button>
        <Button>Option 3</Button>
      </>
    ),
  },
}
