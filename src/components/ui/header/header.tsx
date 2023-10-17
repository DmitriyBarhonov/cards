import { FC } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './header.module.scss'

import { LogOut } from '@/assets/icons/log-out.tsx'
import { Logo } from '@/assets/icons/logo.tsx'
import { PersonOutline } from '@/assets/icons/person-outline.tsx'
import { Button, Dropdown, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { DropdownItem, DropdownItemUserInfo } from '@/components/ui/dropdown-menu/custom-drop-down'
import { useAppDispatch } from '@/hooks/hooks.ts'
import { useLogOutMutation, util } from '@/services/auth'

type HeaderProps = {
  isAuth: boolean //если авторизован то будет аватарка, если нет то кнопка sign in
  name?: string
  email?: string
  avatar?: string
  onSignIn: () => void
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
  const [logOut] = useLogOutMutation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    //TODO избавиться от повтора в personal-info
    logOut()
      .unwrap()
      .then(() => {
        dispatch(util?.resetApiState())
        navigate('/login')
      })
  }

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
          <Dropdown
            trigger={
              <span>
                <Avatar avatar={avatar} name={name || 'no name'} />
              </span>
            }
            width={250}
          >
            <>
              <DropdownItemUserInfo
                name={name ? name : ''}
                email={email ? email : ''}
                element={<Avatar name={name || 'no name'} />}
              />
              <div className={s.dropdownElement}>
                <DropdownItem
                  border={true}
                  icon={<PersonOutline />}
                  element={
                    <Typography as={Link} to="/personal-info" variant={'h3'}>
                      {'My Profile'}
                    </Typography>
                  }
                />
              </div>
              <div className={s.dropdownElement}>
                <DropdownItem
                  border={true}
                  icon={<LogOut />}
                  element={
                    <Typography as={'button'} onClick={handleLogOut} variant={'h3'}>
                      {'Log Out'}
                    </Typography>
                  }
                />
              </div>
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
