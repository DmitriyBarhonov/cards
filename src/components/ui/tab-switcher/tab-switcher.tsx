import { FC } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'

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
  const classNames = {
    toggleGroup: clsx(s.toggleGroup),
    toggleGroupItem: clsx(s.toggleGroupItem),
  }

  return (
    <ToggleGroup.Root
      className={classNames.toggleGroup}
      type="single"
      defaultValue={restProps.defaultValue}
      aria-label="Text alignment"
      loop={false}
    >
      {options.map((option: ToggleOptionsType) => {
        return (
          <ToggleGroup.Item
            key={option.value}
            className={classNames.toggleGroupItem}
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
