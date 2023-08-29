import { ChangeEvent, ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { clsx } from 'clsx'

import s from './input.module.scss'

import { CleanInputIcon } from '@/components/assets/icons/CleanInput.tsx'
import { SearchIcon } from '@/components/assets/icons/Search.tsx'
import { WatchPassIcon } from '@/components/assets/icons/WatchPass.tsx'
import { CrossedOutWatchPassIcon } from '@/components/assets/icons/WatchPassCrossedOut.tsx'

export type CardsInputProps<T extends ElementType> = {
  as?: T
  label?: string
  required?: boolean
  errorMessage?: string
  value: string
  onInputValueChange?: (value: string) => void
  variant?: 'standard' | 'password' | 'search'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const CardsInput = (props: CardsInputProps<any>) => {
  const {
    required,
    value,
    onInputValueChange,
    variant = 'standard',
    fullWidth,
    className,
    as: Component = 'input',
    ...rest
  } = props
  const [hidePass, setHidePass] = useState(true)
  const [inputValue, setInputValue] = useState('')

  const toggleWatchPassword = () => {
    setHidePass(!hidePass)
  }
  const clearInputHandler = () => {
    setInputValue('')
  }

  const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    onInputValueChange?.(e.currentTarget.value)
  }
  const isInputSearch = variant === 'search'
  const isInputPass = variant === 'password'
  const inputType = isInputPass && hidePass ? 'password' : 'text'

  const classNames = {
    inputContainer: clsx(s.inputContainer),
    watchPassButton: clsx(s.watchPassButton, rest.disabled && s.disabledIcon),
    searchIconsContainer: clsx(s.inputIconsContainer),
    searchIcon: clsx(s.inputSearchIcon, rest.disabled && s.disabledIcon),
    clearFieldIcon: clsx(s.inputCleanFieldIcon, rest.disabled && s.disabledIcon),
    inputLabel: clsx(s.label, rest.disabled && s.disabledLabel),
    error: clsx(s.error),
    inputField: clsx(
      s[variant],
      rest.errorMessage && s.errorInput,
      fullWidth && s.fullWidth,
      className
    ),
  }

  return (
    <div className={classNames.inputContainer}>
      {isInputPass && (
        <span className={classNames.watchPassButton} onClick={toggleWatchPassword}>
          {hidePass ? <WatchPassIcon /> : <CrossedOutWatchPassIcon />}
        </span>
      )}

      {isInputSearch && (
        <div className={classNames.searchIconsContainer}>
          <span className={classNames.searchIcon}>
            <SearchIcon />
          </span>
          {inputValue && (
            <span onClick={clearInputHandler} className={classNames.clearFieldIcon}>
              <CleanInputIcon />
            </span>
          )}
        </div>
      )}

      <label className={classNames.inputLabel}>
        {rest.label}
        <Component
          onBlur={onInputValueChangeHandler}
          required={required}
          value={inputValue}
          onChange={onInputValueChangeHandler}
          type={inputType}
          className={classNames.inputField}
          {...rest}
        />
        {rest.errorMessage && <p className={classNames.error}>{rest.errorMessage}</p>}
      </label>
    </div>
  )
}
