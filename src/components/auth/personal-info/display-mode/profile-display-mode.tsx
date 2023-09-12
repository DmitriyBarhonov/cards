import { FC } from 'react'

import { clsx } from 'clsx'

import s from './display-mode.module.scss'

import { EdittextIcon } from '@/assets/icons/editText.tsx'
import { LogOut } from '@/assets/icons/logOut.tsx'
import { Button, Typography } from '@/components/ui'

type Props = {
  email?: string
  name?: string
  onEditTextClickHandler: () => void
  onLogoutClickHandler: () => void
}
export const ProfileDisplayMode: FC<Props> = ({
  name,
  email,
  onEditTextClickHandler,
  onLogoutClickHandler,
}) => {
  const nameForPersonalInfo = name ? name : 'Kilobucks Lover'
  const emailForPersonalInfo = email ? email : 'ihateincubatorexams@gmail.com'

  const classNames = {
    info: clsx(s.profileTitle),
    editButton: clsx(s.editTextButton),
    editIcon: clsx(s.editTextIcon),
    email: clsx(s.bottomText),
    logOut: clsx(s.logOutButton),
  }

  return (
    <>
      <Typography className={classNames.info} variant={'h2'}>
        {nameForPersonalInfo}
        <button className={classNames.editButton}>
          <EdittextIcon className={classNames.editIcon} onClick={onEditTextClickHandler} />
        </button>
      </Typography>
      <Typography className={classNames.email} variant={'body1'}>
        {emailForPersonalInfo}
      </Typography>
      <Button onClick={onLogoutClickHandler} className={classNames.logOut} variant={'secondary'}>
        <LogOut /> Logout
      </Button>
    </>
  )
}
