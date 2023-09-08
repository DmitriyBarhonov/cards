import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInfo } from './index.ts'

const meta = {
  title: 'Components/Auth/PersonalInfo',
  component: PersonalInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
