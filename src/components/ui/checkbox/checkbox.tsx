import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

import { Check } from '@/assets/icon/check'

export type CheckboxType = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
}

export const Checkbox: FC<CheckboxType> = props => {
  return (
    <div className={s.wrapperButton}>
      <CheckboxRadix.Root
        disabled={props.disabled}
        className={s.CheckboxRoot}
        onCheckedChange={props.onChange}
      >
        <CheckboxRadix.Indicator className={s.CheckboxIndicator}>
          <Check />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {props.label || 'lable'}
    </div>
  )
}
