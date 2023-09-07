import * as RadioGroup from '@radix-ui/react-radio-group'

import { Typography } from '..'

import s from './radio-group.module.scss'
type Option = {
  label: string
  value: string
}
export type RadioGroupProps = {
  options?: Option[]
  onValueChange?: (value: string) => void
  className?: string
  value?: string
}

export const RadioGroupDemo = (props: RadioGroupProps) => {
  const onValueChangeHandler = (value: any) => {
    if (props.onValueChange) props.onValueChange(value)
  }

  return (
    <div style={{ margin: '30px' }}>
      <RadioGroup.Root
        value={props.value}
        onValueChange={onValueChangeHandler}
        className={s.RadioGroupRoot}
      >
        {props.options?.map(el => {
          return (
            <div key={el.value}>
              <RadioGroup.Item id={el.value} className={s.RadioGroupItem} value={el.value}>
                <RadioGroup.Indicator className={s.RadioGroupIndicator} />
              </RadioGroup.Item>
              <Typography variant={'body2'} as={'label'} htmlFor={el.value}>
                <label>{el.label}</label>
              </Typography>
            </div>
          )
        })}
      </RadioGroup.Root>
    </div>
  )
}
