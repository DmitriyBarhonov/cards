import { FC } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

export const DropdownMenuDemo: FC<any> = ({ children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button aria-label="Customise options">Trigger</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
