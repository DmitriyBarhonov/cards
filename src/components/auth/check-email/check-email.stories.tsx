import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './index.ts'

const meta = {
  title: 'Components/CheckEmail',
  component: CheckEmail,
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
