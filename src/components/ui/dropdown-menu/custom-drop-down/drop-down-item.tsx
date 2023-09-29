import { FC } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
type DropdownItemType = {
  icon: any
  onClick: () => void
  text: string
}
export const DropdownItem: FC<DropdownItemType> = props => {
  return <DropdownMenu.Item className={'s.DropdownMenuItem'}>{props.text}</DropdownMenu.Item>
}
