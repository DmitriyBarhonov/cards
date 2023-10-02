import { CSSProperties, FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdown-menu.module.scss'

type DropdownType = {
  trigger: ReactNode
  children: ReactNode
  width: CSSProperties['width']
}

export const Dropdown: FC<DropdownType> = ({ children, trigger, width }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={s.trigger} asChild>
        <button aria-label="Trigger">{trigger}</button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} style={{ width }} sideOffset={5}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
