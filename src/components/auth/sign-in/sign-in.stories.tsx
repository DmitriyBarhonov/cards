import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './index.ts'

const meta = {
  title: 'Components/Auth/SignIn',
  component: SignIn,
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
