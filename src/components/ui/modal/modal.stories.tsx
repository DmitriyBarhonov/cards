import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './index.ts'

import { Button } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Button>Add a new card</Button>,
    open: true,
    modalMainTitle: 'Ah shit, here we go again',
  },
}
export const LargeTitle: Story = {
  args: {
    open: true,
    children: <Button>Add a new card</Button>,
    modalMainTitle: 'Ah shit, here we go again',
    modalTitleVariant: 'large',
  },
}
export const NoTitleModal: Story = {
  args: {
    open: true,
    children: <Button>Add a new card</Button>,
  },
}
