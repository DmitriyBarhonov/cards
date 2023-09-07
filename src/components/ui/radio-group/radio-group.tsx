import { forwardRef } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { useForm } from 'react-hook-form'

import { Typography } from '..'

import s from './radio-group.module.scss'

type RadioPros = {
  options: Option[]
  onValueChange?: (value: string) => void
  className?: string
}
type Option = {
  label: string
  value: string
}
type FormData = {
  selectedOption: string // Предполагается, что это строка, которая будет хранить выбранное значение из Radio Group
}

export const RadioGroupDemo = forwardRef((props: RadioPros, ref) => {
  const { register, handleSubmit } = useForm<FormData>()

  const onValueChangeHandler = (value: any) => {
    if (props.onValueChange) props.onValueChange(value)
  }

  return (
    <div style={{ margin: '30px' }}>
      <RadioGroup.Root
        onValueChange={handleSubmit(onValueChangeHandler)}
        className={s.RadioGroupRoot}
      >
        {props.options.map(el => {
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
})
