import type { Meta, StoryObj } from '@storybook/react'

import { Dropdown, Button, Avatar, Typography } from '@/components/ui'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Authorized: Story = {
  args: {
    trigger: (
      <span className={'mt-24'}>
        <Avatar name={'Kilobuks Lover'} />
      </span>
    ),
    width: '300px',
    children: (
      <>
        <div className={'flex'}>
          <span className={'m-3'}>
            <Avatar name={'Kilobuks Lover'} />
          </span>
          <div className={'flex-col mt-2'}>
            <Typography variant={'h3'}>{'Kilobuks Lover'}</Typography>

            <span className={'text-zinc-400'}>
              <Typography variant={'body2'}>{'ilovekilubuks@gmail.com'}</Typography>
            </span>
          </div>
        </div>
        <Button>Option 2</Button>
        <Button>Option 3</Button>
      </>
    ),
  },
}
