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
  disabled?: boolean
  defaultValue?: string
  onValueChange?: () => void
  className?: string
  value?: any
}
export const TabSwitcher: FC<TabSwitcherProps> = ({ options, disabled, ...restProps }) => {
  const classNames = {
    toggleGroup: clsx(disabled ? s.toggleDisabled : s.toggleGroup),
    toggleGroupItem: clsx(disabled ? s.toggleDisabledItem : s.toggleGroupItem),
  }

  return (
    <ToggleGroup.Root
      className={`${classNames.toggleGroup} ${restProps.className}`}
      type="single"
      disabled={disabled}
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
