import type { Meta, StoryObj } from '@storybook/react'

import { SetNewPass } from './index.ts'

const meta = {
  title: 'Components/Auth/SetNewPass',
  component: SetNewPass,
} satisfies Meta<typeof SetNewPass>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
