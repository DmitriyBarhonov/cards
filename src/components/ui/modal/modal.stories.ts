import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './index.ts'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    modalButtonTitle: 'Тра-та-та, тра-та-та',
    modalMainTitle: 'Ah shit, here we go again',
  },
}
export const LargeTitle: Story = {
  args: {
    modalButtonTitle: 'Тра-та-та, тра-та-та',
    modalMainTitle: 'Ah shit, here we go again',
    modalTitleVariant: 'large',
  },
}
export const NoTitleModal: Story = {
  args: {
    modalButtonTitle: 'я устал, я ухожу',
  },
}
