import { FC } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import { Typography } from '../typography'

import s from './checkbox.module.scss'

import { Check } from '@/assets/icons'

export type CheckboxProps = {
  className?: string
  checked?: boolean
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
}
const classNames = {
  icon: clsx(s.icon),
  checkboxRoot(disabled?: boolean) {
    return clsx(disabled ? s.checkboxRootDisabled : s.checkboxRoot)
  },
  label(disabled?: boolean) {
    return clsx(disabled ? s.labelDisabled : s.label)
  },
  radioGroupItem(disabled?: boolean) {
    return clsx(disabled ? s.radioGroupItemDisabled : s.radioGroupItem)
  },
  arrowColor(disabled?: boolean) {
    return clsx(disabled ? '#DCDAE0' : 'black')
  },
  bgColor(disabled?: boolean) {
    return clsx(disabled ? '#808080' : 'white')
  },
}

export const Checkbox: FC<CheckboxProps> = ({
  // className,
  checked,
  onValueChange,
  disabled,
  // required,
  label,
  id,
}) => {
  return (
    <div>
      <Typography variant="body2" as="label" className={disabled ? s.labelDisabled : s.label}>
        <CheckboxRadix.Root
          disabled={disabled}
          className={classNames.checkboxRoot(disabled)}
          onCheckedChange={onValueChange}
          checked={checked}
          id={id}
          value={'1'}
        >
          <CheckboxRadix.Indicator>
            {checked && (
              <Check
                arrowColor={classNames.arrowColor(disabled)}
                bgColor={classNames.bgColor(disabled)}
                className={classNames.icon}
              />
            )}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        <div> {label}</div>
      </Typography>
    </div>
  )
}
