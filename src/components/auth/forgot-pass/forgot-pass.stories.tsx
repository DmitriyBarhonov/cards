import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { ForgotPass } from './index.ts'

const meta = {
  title: 'Components/Auth/ForgotPass',
  component: ForgotPass,
} satisfies Meta<typeof ForgotPass>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <BrowserRouter>
        <ForgotPass {...args} />
      </BrowserRouter>
    )
  },
}
