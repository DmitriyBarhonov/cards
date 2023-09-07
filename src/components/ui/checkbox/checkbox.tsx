import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

import { Check } from '@/assets/icons/check'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  checked,
  onValueChange,
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
          onCheckedChange={onValueChange}
          checked={checked}
          id={id}
          value={'1'}
        >
          <CheckboxRadix.Indicator>
            {checked && (
              <Check
                arrowColor={disabled ? '#DCDAE0' : 'black'}
                bgColor={disabled ? '#808080' : 'white'}
                className={s.icon}
              />
            )}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <div> {label}</div>
      </Typography>
    </div>
  )
}
