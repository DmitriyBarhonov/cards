import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Logo } from '../../../assets/icons/Logo'

import s from './header.module.scss'

import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PersonOutline } from '@/assets/icons/person-outline.tsx'
import { Button, Dropdown, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'

type HeaderProps = {
  isAuth: boolean //если авторизован то будет аватарка, если нет то кнопка sign in
  name?: string
  email?: string
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
                <Avatar avatar={avatar} className={'m-17'} name={'Kilobuks Lover'} />
              </span>
            }
            width={200}
          >
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
          </Dropdown>
          {/*<Avatar name={name || 'no name'} avatar={avatar} />*/}
        </div> //здесь будет закрывающий тег дропдауна
      ) : (
        <div className={s.button}>
          <Button onClick={onSignIn}> Sign In </Button>
        </div>
      )}
    </div>
  )
}
