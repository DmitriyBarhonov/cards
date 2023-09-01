import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

import { Check } from '@/assets/icons/check'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  checked,
  onChange,
  disabled,
  required,
  label,
  id,
}) => {
  return (
    <div className={className}>
      <Typography variant="body2" as="label" className={disabled ? s.labelDisabled : s.label}>
        <CheckboxRadix.Root
          disabled={disabled}
          className={disabled ? s.disabledCheckboxRoot : s.checkboxRoot}
          onCheckedChange={onChange}
        >
          <CheckboxRadix.Indicator>
            <Check
              arrowColor={disabled ? '#DCDAE0' : 'black'}
              bgColor={disabled ? '#808080' : 'white'}
              className={s.icon}
            />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <div> {label}</div>
      </Typography>
    </div>
  )
}
