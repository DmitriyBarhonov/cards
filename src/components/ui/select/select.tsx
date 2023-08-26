import { CSSProperties, FC } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import { RxCaretDown } from 'react-icons/rx'

import { Typography } from '../typography'

import s from './select.module.scss'

type Option = { label: string; value: string }

type ConditionalMultipleProps = {
  multiple?: true
  value: string
  onChange: (value: string) => void
}

type CommonProps = {
  className?: string
  disabled?: boolean
  name?: string
  placeholder?: string
  required?: boolean
  variant?: 'primary' | 'pagination'
  options: Array<Option>
  portal?: boolean
  errorMessage?: string
  label?: string
  width?: CSSProperties['width']
  rootClassName?: string
}
export type SelectProps = CommonProps & ConditionalMultipleProps

export const Select: FC<SelectProps> = ({
  variant = 'primary',
  placeholder,
  value,
  disabled,
  className,
  onChange,
  errorMessage,
  options,
  label,
  rootClassName,
  width,
}) => {
  const showError = !!errorMessage && errorMessage.length > 0
  const trigger = `${s.trigger} ${s[variant]} ${showError ? s.error : ''} ${className}`
  const rootStyles = { width }
  const noPlaceholder = variant === 'pagination' ? value : 'Select Box'

  return (
    <div className={rootClassName}>
      <Typography
        variant={'body2'}
        as="label"
        className={`${s.label} ${disabled ? s.disabled : ''}`}
      >
        {label}
      </Typography>
      <SelectRadix.Root disabled={disabled} onValueChange={onChange}>
        <SelectRadix.Trigger className={trigger} style={rootStyles}>
          <SelectRadix.Value placeholder={placeholder || noPlaceholder}>
            {value}
            {/*<Typography variant={'body1'}>{value}</Typography>*/}
          </SelectRadix.Value>
          <SelectRadix.Icon className={`${s.icon} ${s[variant]}`}>
            <RxCaretDown />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={`${s.content} ${s[variant]}`} position={'popper'}>
            {options.map(option => (
              <SelectRadix.Item
                value={option.value}
                className={`${s.item} ${s[variant]}`}
                key={option.value}
              >
                {option.label}
              </SelectRadix.Item>
            ))}
          </SelectRadix.Content>
        </SelectRadix.Portal>
        {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </SelectRadix.Root>
    </div>
  )
}
