import { FC, useState } from 'react'

import { clsx } from 'clsx'

import s from './personal-info.module.scss'

import { ProfileDisplayMode } from '@/components/auth/personal-info/display-mode'
import { ProfileEditMode } from '@/components/auth/personal-info/edit-mode'
import { Avatar, Card, Typography } from '@/components/ui'

export type PersonalInfoProps = {
  name?: string
  avatar?: string
  email?: string
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ name, avatar, email }) => {
  const [editMode, setEditMode] = useState(false)

  const nameForPersonalInfo = name ? name : 'Kilobucks Lover'
  const imgForPersonalInfo = avatar
    ? avatar
    : 'https://kartinkof.club/uploads/posts/2022-03/1648314602_1-kartinkof-club-p-negr-dumaet-mem-1.jpg'

  const classNames = {
    formContainer: clsx(s.formContainer),
    card: clsx(s.card),
    form: clsx(s.formBody),
    mainTitle: clsx(s.formTitle),
    avatar: clsx(s.avatarContainer),
  }

  const onEditTextClickHandler = () => {
    setEditMode(true)
  }
  const onInputBlurHandler = () => {
    setEditMode(false)
  }

  const onLogoutClickHandler = () => {
    //ляляля это заглушка =D
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <div className={classNames.form}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            Personal Information
          </Typography>
          <div>
            <Avatar
              className={classNames.avatar}
              name={nameForPersonalInfo}
              avatar={imgForPersonalInfo}
            />
          </div>

          {editMode ? (
            <ProfileEditMode onInputBlurHandler={onInputBlurHandler} />
          ) : (
            <ProfileDisplayMode
              email={email}
              name={name}
              onEditTextClickHandler={onEditTextClickHandler}
              onLogoutClickHandler={onLogoutClickHandler}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
