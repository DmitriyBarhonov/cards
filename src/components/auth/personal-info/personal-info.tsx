import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

import s from './personal-info.module.scss'

import { EdittextIcon } from '@/assets/icons/edit-text'
import { ProfileDisplayMode } from '@/components/auth/personal-info/display-mode'
import { ProfileEditMode } from '@/components/auth/personal-info/edit-mode'
import { Avatar, Button, Card, Typography } from '@/components/ui'
import { useGetMeQuery, useLogOutMutation } from '@/services/auth'

export type PersonalInfoProps = {
  name?: string
  avatar?: string
  email?: string
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ avatar, email }) => {
  const [editMode, setEditMode] = useState(false)
  const { data: me } = useGetMeQuery()
  const [logOut] = useLogOutMutation()
  const navigate = useNavigate()

  const imgForPersonalInfo = avatar
    ? avatar
    : 'https://kartinkof.club/uploads/posts/2022-03/1648314602_1-kartinkof-club-p-negr-dumaet-mem-1.jpg'

  const classNames = {
    formContainer: clsx(s.formContainer),
    card: clsx(s.card),
    form: clsx(s.formBody),
    mainTitle: clsx(s.formTitle),
    avatarWrapper: clsx(s.avatarWrapper),
    avatar: clsx(s.avatarContainer),
    editButton: clsx(s.editTextButton),
    editIcon: clsx(s.editTextIcon),
    editProfileNameIcon: clsx(s.editProfName),
  }
  const onEditTextClickHandler = () => {
    setEditMode(true)
  }
  const onEditAvatarClickHandler = () => {
    //кваква заглушка лягушка о.О
  }
  const onInputBlurHandler = () => {
    setEditMode(false)
  }

  const handleLogOut = async () => {
    try {
      await logOut()
      alert('DONE LOGOUT, BABY!')
      navigate('/')
    } catch (error) {
      // @ts-ignore
      alert(`AH SHIT, HERE WE GO AGAIN .-. ${error.data}`)
    }
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <div className={classNames.form}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            Personal Information
          </Typography>
          <div className={classNames.avatarWrapper}>
            <Avatar className={classNames.avatar} name={me.name} avatar={imgForPersonalInfo} />
            <Button
              onClick={onEditAvatarClickHandler}
              className={classNames.editButton}
              variant={'secondary'}
            >
              <EdittextIcon className={classNames.editIcon} onClick={onEditTextClickHandler} />
            </Button>
            {/*<button className={classNames.editButton}>*/}
            {/*  <EdittextIcon className={classNames.editIcon} onClick={onEditTextClickHandler} />*/}
            {/*</button>*/}
          </div>

          {editMode ? (
            <ProfileEditMode onInputBlurHandler={onInputBlurHandler} />
          ) : (
            <ProfileDisplayMode
              email={email}
              name={me.name}
              onEditTextClickHandler={onEditTextClickHandler}
              onLogoutClickHandler={handleLogOut}
            />
          )}
        </div>
      </Card>
    </div>
  )
}
