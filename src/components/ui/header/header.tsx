import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './header.module.scss'

import { Logo } from '@/assets/icons/Logo.tsx'
import { Button, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'

type HeaderProps = {
  isAuth: boolean //если авторизован то будет аватарка, если нет то кнопка sign in
  name?: string
  avatar?: string
  onSignIn: () => void //на кнопку авторизации
  // onSignOut: () => void //передаем в дропдаун
  // onProfileClick: () => void //передаем на аватурку чтобы открылся дропдаун
}
export const Header: FC<HeaderProps> = ({
  isAuth = false,
  name,
  avatar,
  onSignIn,
  // onSignOut,
  // onProfileClick,
}) => {
  return (
    <div className={s.header}>
      <Button variant={'link'} as={Link} to={'/'}>
        <Logo className={s.logo} />
      </Button>
      {isAuth ? (
        //здесь будет открывающий тег дропдауна, тамбудет логика по sign out и onProfileClick
        <div className={s.avatar}>
          <Typography variant="subtitle1" className={s.name}>
            {name || 'no name'}
          </Typography>
          <Avatar name={name || 'no name'} avatar={avatar} />
        </div> //здесь будет закрывающий тег дропдауна
      ) : (
        <div className={s.button}>
          <Button onClick={onSignIn}> Sign In </Button>
        </div>
      )}
    </div>
  )
}
