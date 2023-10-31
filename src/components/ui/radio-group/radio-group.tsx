import { FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import { Typography } from '..'

import s from './radio-group.module.scss'

export type OptionType = {
  label: string
  value: string
}
export type RadioGroupProps = {
  options?: OptionType[]
  onValueChange?: (value: string) => void
  className?: string
  value?: string
  disabled?: boolean
}

export const RadioGroupComponet: FC<RadioGroupProps> = props => {
  const onValueChangeHandler = (value: string) => {
    if (props.onValueChange) props.onValueChange(value)
  }
  const classNames = {
    wrapperItem: clsx(s.wrapperItem),
    radioGroupRoot: clsx(s.radioGroupRoot),
    radioGroupIndicator(disabled?: boolean) {
      return clsx(disabled ? s.radioGroupIndicatorDisabled : s.radioGroupIndicator)
    },
    label(disabled?: boolean) {
      return clsx(disabled ? s.labelDisabled : s.label)
    },
    radioGroupItem(disabled?: boolean) {
      return clsx(disabled ? s.radioGroupItemDisabled : s.radioGroupItem)
    },
  }

  return (
    <div>
      <RadioGroup.Root
        value={props.value}
        onValueChange={onValueChangeHandler}
        className={classNames.radioGroupRoot}
      >
        {props.options?.map((el, index) => {
          return (
            <div className={classNames.wrapperItem} key={index}>
              <RadioGroup.Item
                role="radio"
                tabIndex={index + 1}
                id={el.value}
                className={classNames.radioGroupItem(props.disabled)}
                value={el.value}
                disabled={props.disabled}
              >
                <RadioGroup.Indicator className={classNames.radioGroupIndicator(props.disabled)} />
              </RadioGroup.Item>
              <Typography variant={'body2'} as={'label'} htmlFor={el.value}>
                <label className={classNames.label(props.disabled)}>{el.label}</label>
              </Typography>
            </div>
          )
        })}
      </RadioGroup.Root>
    </div>
  )
}
