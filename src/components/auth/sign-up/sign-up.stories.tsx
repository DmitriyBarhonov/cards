import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './index.ts'

const meta = {
  title: 'Components/SignUp',
  component: SignUp,
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
