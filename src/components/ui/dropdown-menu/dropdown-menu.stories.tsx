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
        <Avatar className={'m-17'} name={'Kilobuks Lover'} />
      </span>
    ),
    width: '100',
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
        <div className={'flex flex-col'}>
          {/*    времннная дивка чтобы проверить ка котобразится иконка*/}
          <Typography as={Link} to="/personal-info" variant={'h3'} className={'flex-row'}>
            <EdittextIcon style={{ color: 'green' }} /> {'My Profile'}
          </Typography>
          <Typography variant={'h3'}>
            {'Kilobuks Lover'}
            <PersonOutline className={'text-white'} width={20} height={20} />
          </Typography>
        </div>
      </>
    ),
  },
}
