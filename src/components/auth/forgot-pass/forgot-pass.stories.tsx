import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPass } from './index.ts'

const meta = {
  title: 'Components/ForgotPass',
  component: ForgotPass,
} satisfies Meta<typeof ForgotPass>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
