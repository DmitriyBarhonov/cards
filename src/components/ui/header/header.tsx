import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './header.module.scss'

import { LogOut } from '@/assets/icons/log-out.tsx'
import { Logo } from '@/assets/icons/Logo.tsx'
import { PersonOutline } from '@/assets/icons/person-outline.tsx'
import { Button, Dropdown, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'

type HeaderProps = {
  isAuth: boolean //если авторизован то будет аватарка, если нет то кнопка sign in
  name?: string
  email?: string
  avatar?: string
  onSignIn: () => void
  // onSignOut: () => void //передаем в дропдаун
  // onProfileClick: () => void //передаем на аватурку чтобы открылся дропдаун
}
export const Header: FC<HeaderProps> = ({
  isAuth = false,
  name,
  email,
  avatar,
  onSignIn,
  // onSignOut,
  // onProfileClick,
}) => {
  return (
    <div className={s.header}>
      <Logo className={s.logo} />
      {isAuth ? (
        //здесь будет открывающий тег дропдауна, тамбудет логика по sign out и onProfileClick
        <div className={s.avatar}>
          <Typography variant="subtitle1" className={s.name}>
            {name || 'no name'}
          </Typography>
          <Dropdown
            trigger={
              <span>
                <Avatar avatar={avatar} name={name || 'no name'} />
              </span>
            }
            width={250}
          >
            <>
              <div className={'flex'}>
                <span className={'mr-3 mt-1'}>
                  <Avatar name={name || 'no name'} />
                </span>
                <div className={'flex-col '}>
                  <Typography variant={'h3'}>{name}</Typography>

                  <span className={'text-zinc-400'}>
                    <Typography variant={'body2'}>{email}</Typography>
                  </span>
                </div>
              </div>
              <Typography
                as={Link}
                to="/personal-info"
                variant={'h3'}
                className={s.dropdownTextChildren}
              >
                <PersonOutline /> {'My Profile'}
              </Typography>
              <Typography
                as={'button'}
                onClick={() => {}}
                variant={'h3'}
                className={s.dropdownTextChildren}
              >
                <LogOut /> {'My Profile'}
              </Typography>
            </>
          </Dropdown>
        </div>
      ) : (
        <div className={s.button}>
          <Button onClick={onSignIn}> Sign In </Button>
        </div>
      )}
    </div>
  )
}
