import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './custom-drop-down.module.scss'

type DropdownItemType = {
  icon?: any
  onClick?: () => void
  elment?: ReactNode
  border: boolean
}

export const DropdownItem: FC<DropdownItemType> = props => {
  const wrapper = props.border ? s.wrapperBorder : s.wrapper

  return (
    <DropdownMenu.Item className={s.DropdownMenuItem}>
      <div className={wrapper}>
        <div className={s.icon}>{props.icon}</div>
        <div className={s.elmentDropDown}>{props.elment}</div>
      </div>
    </DropdownMenu.Item>
  )
}
