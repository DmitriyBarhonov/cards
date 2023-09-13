import { FC } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'

import s from './tab-switcher.module.scss'

type ToggleOptionsType = {
  label: string
  value: string
}

type TabSwitcherProps = {
  options: ToggleOptionsType[]
  defaultValue?: string
  onValueChange?: () => void
  className?: string
  value?: any
}
export const TabSwitcher: FC<TabSwitcherProps> = ({ options, ...restProps }) => {
  return (
    <ToggleGroup.Root
      className={s.toggleGroup}
      type="single"
      defaultValue={restProps.defaultValue}
      aria-label="Text alignment"
      loop={false}
    >
      {options.map((option: ToggleOptionsType) => {
        return (
          <ToggleGroup.Item
            key={option.value}
            className={s.toggleGroupItem}
            value={option.value}
            aria-label={option.label}
          >
            {option.label}
          </ToggleGroup.Item>
        )
      })}
    </ToggleGroup.Root>
  )
}
