import { FC } from 'react'

import { TextAlignLeftIcon, TextAlignRightIcon } from '@radix-ui/react-icons'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import s from './tab-switcher.module.scss'

type ToggleOptions = {
  label: string
  value: string
}

type TabSwitcherProps = {
  options: ToggleOptions[]
  onValueChange?: () => void
  className?: string
  value?: any
}
export const TabSwitcher: FC<TabSwitcherProps> = () => {
  return (
    <ToggleGroup.Root
      className={s.ToggleGroup}
      type="single"
      defaultValue="center"
      aria-label="Text alignment"
    >
      <ToggleGroup.Item className={s.ToggleGroupItem} value="left" aria-label="Left aligned">
        <TextAlignLeftIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item className={s.ToggleGroupItem} value="right" aria-label="Right aligned">
        <TextAlignRightIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
