import { ChangeEvent, FC, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

import s from './personal-info.module.scss'

import { EdittextIcon } from '@/assets/icons/edit-text'
import { ProfileDisplayMode } from '@/components/auth/personal-info/display-mode'
import { ProfileEditMode } from '@/components/auth/personal-info/edit-mode'
import { Avatar, Button, Card, Typography } from '@/components/ui'
import { useAppDispatch } from '@/hooks/hooks.ts'
import { useGetMeQuery, useLogOutMutation, useUpdateMeMutation, util } from '@/services/auth'
import { UserDataUpdate } from '@/services/auth/auth.types.ts'

export type PersonalInfoProps = {}

export const PersonalInfo: FC<PersonalInfoProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [editMode, setEditMode] = useState(false)
  const { data: me } = useGetMeQuery()
  const [logOut] = useLogOutMutation()
  const [updateMe] = useUpdateMeMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const imgForPersonalInfo = me.avatar
    ? me.avatar
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
    upload: clsx(s.uploadInput),
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const updateAvatar = (data: UserDataUpdate) => {
    const form = new FormData()

    data.avatar && form.append('avatar', data.avatar)

    updateMe(form)
  }
  const uploadImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      updateAvatar({ avatar: file })
    }
  }
  const onEditTextClickHandler = () => {
    setEditMode(true)
  }
  const onInputBlurHandler = () => {
    setEditMode(false)
  }

  const handleLogOut = () => {
    logOut()
      .unwrap()
      .then(() => {
        dispatch(util?.resetApiState())
        navigate('/login')
      })
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
            <input
              type="file"
              onChange={uploadImgHandler}
              className={classNames.upload}
              ref={inputRef}
            />
            <Button
              onClick={selectFileHandler}
              className={classNames.editButton}
              variant={'secondary'}
            >
              <EdittextIcon className={classNames.editIcon} onClick={selectFileHandler} />
            </Button>
          </div>

          {editMode ? (
            <ProfileEditMode name={me.name} onInputBlurHandler={onInputBlurHandler} />
          ) : (
            <ProfileDisplayMode
              email={me.email}
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
