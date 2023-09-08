import { FC, useState } from 'react'

import { clsx } from 'clsx'

import s from './personal-info.module.scss'

import { EdittextIcon } from '@/assets/icons/editText.tsx'
import { LogOut } from '@/assets/icons/logOut.tsx'
import { Avatar, Button, Card, CardsInput, Typography } from '@/components/ui'

export type PersonalInfoProps = {
  name?: string
  avatar?: string
  email?: string
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ name, avatar, email }) => {
  const [editMode, setEditMode] = useState(false)

  const classNames = {
    formContainer: clsx(s.formContainer),
    card: clsx(s.card),
    form: clsx(s.formBody),
    mainTitle: clsx(s.formTitle),
    avatar: clsx(s.avatarContainer),
    input: clsx(s.formInput),
    submit: clsx(s.submitButton),
    info: clsx(s.profileTitle),
    editButton: clsx(s.editTextButton),
    editIcon: clsx(s.editTextIcon),
    email: clsx(s.bottomText),
    logOut: clsx(s.logOutButton),
  }
  const emailForPersonalInfo = email ? email : 'ihateincubatorexams@gmail.com'
  const nameForPersonalInfo = name ? name : 'Kilobucks Lover'
  const imgForPersonalInfo = avatar
    ? avatar
    : 'https://kartinkof.club/uploads/posts/2022-03/1648314602_1-kartinkof-club-p-negr-dumaet-mem-1.jpg'

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
            <>
              <CardsInput
                onBlur={onInputBlurHandler}
                className={classNames.input}
                label={'Nickname'}
              />
              <Button className={classNames.submit} variant={'primary'}>
                Save Changes
              </Button>
            </>
          ) : (
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
              <Button
                onClick={onLogoutClickHandler}
                className={classNames.logOut}
                variant={'secondary'}
              >
                <LogOut /> Logout
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
