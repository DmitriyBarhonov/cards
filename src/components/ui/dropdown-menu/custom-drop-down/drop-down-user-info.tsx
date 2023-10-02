import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './custom-drop-down.module.scss'

type DropdownItemType = {
  elment: ReactNode
  name: string
  email: string
  border: boolean
}
export const DropdownItemUserInfo: FC<DropdownItemType> = ({ elment, border, name, email }) => {
  const wrapper = border ? s.wrapperBorder : s.wrapper

  return (
    <DropdownMenu.Item className={s.DropdownMenuItemUser}>
      <div className={wrapper}>
        <div className={s.element}>{elment}</div>
        <div className={s.userInfo}>
          <div className={s.name}>{name}</div>
          <div className={s.email}>{email}</div>
        </div>
      </div>
    </DropdownMenu.Item>
  )
}
