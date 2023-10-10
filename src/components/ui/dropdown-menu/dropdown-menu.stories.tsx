import type { Meta, StoryObj } from '@storybook/react'
import { Link, BrowserRouter } from 'react-router-dom'

import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PersonOutline } from '@/assets/icons/person-outline.tsx'
import { Dropdown, Avatar, Typography } from '@/components/ui'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Authorized: Story = {
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],

  args: {
    trigger: (
      <span>
        <Avatar name={'Kilobuks Lover'} />
      </span>
    ),
    width: '300px',
    children: (
      <>
        <div style={{ marginRight: '100px' }} className={'flex'}>
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
        <div className={'flex'}>
          {/*    времннная дивка чтобы проверить ка котобразится иконка*/}
          <Typography as={Link} to="/personal-info" variant={'h3'}>
            {'My Profile'}
            <EdittextIcon style={{ color: 'green' }} />
          </Typography>
          <Typography variant={'h3'}>{'Kilobuks Lover'}</Typography>
          <PersonOutline className={'text-lime-500'} />
        </div>
      </>
    ),
  },
}
