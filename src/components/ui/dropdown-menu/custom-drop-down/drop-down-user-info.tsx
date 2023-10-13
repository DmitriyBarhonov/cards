import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './custom-drop-down.module.scss'

import { Typography } from '@/components/ui'

type DropdownItemType = {
  element: ReactNode
  name: string
  email: string
  border: boolean
}
export const DropdownItemUserInfo: FC<DropdownItemType> = ({ element, border, name, email }) => {
  const wrapper = border ? s.wrapperBorder : s.wrapper

  return (
    <DropdownMenu.Item className={s.DropdownMenuItemUser}>
      <div className={wrapper}>
        <div className={s.element}>{element}</div>
        <div className={s.useNameAndEmail}>
          <Typography variant={'h3'}>{name}</Typography>
          <Typography className={s.email} variant={'body2'}>
            {email}
          </Typography>
        </div>
      </div>
    </DropdownMenu.Item>
  )
}
