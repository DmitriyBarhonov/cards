import type { Meta, StoryObj } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import { SignUp } from './index.ts'

const meta = {
  title: 'Components/Auth/SignUp',
  component: SignUp,
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    return (
      <BrowserRouter>
        <SignUp {...args} />
      </BrowserRouter>
    )
  },
}
