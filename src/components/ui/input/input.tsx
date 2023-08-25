import { ChangeEvent, ComponentPropsWithoutRef, ElementType, ReactNode, useState } from 'react'

import s from './input.module.scss'

import { CleanInputIcon } from '@/components/assets/icons/CleanInput.tsx'
import { SearchIcon } from '@/components/assets/icons/Search.tsx'
import { WatchPassIcon } from '@/components/assets/icons/WatchPass.tsx'
import { CrossedOutWatchPassIcon } from '@/components/assets/icons/WatchPassCrossedOut.tsx'

export type CardsInputProps<T extends ElementType> = {
  as?: T
  required?: boolean
  value: string
  onInputValueChange?: (value: string) => void
  children: ReactNode
  variant?: 'standard' | 'password' | 'search'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<T>

export const CardsInput = <T extends ElementType = 'input'>(
  props: CardsInputProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardsInputProps<T>>
) => {
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
  const [error, setError] = useState('')

  const toggleWatchPassword = () => {
    setHidePass(!hidePass)
  }
  const clearInputHandler = () => {
    setInputValue('')
  }

  const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    if (inputValue.trim() === '') {
      setError('The field is required')
    } else if (inputValue !== '') {
      setError('')
    }
    //just a check that we have the function
    // in case we'll have a changeHandler fnc for the input
    if (onInputValueChange) {
      onInputValueChange(e.currentTarget.value.toString())
    }
  }

  return (
    <div className={s.inputContainer}>
      {/*show and hide password logic*/}
      {variant === 'password' &&
        (hidePass ? (
          <span className={s.watchPassButton} onClick={toggleWatchPassword}>
            {' '}
            <CrossedOutWatchPassIcon />{' '}
          </span>
        ) : (
          <span className={s.watchPassButton} onClick={toggleWatchPassword}>
            {' '}
            <WatchPassIcon />{' '}
          </span>
        ))}

      {variant === 'search' && (
        <div className={s.inputIconsContainer}>
          <span className={s.inputSearchIcon}>
            <SearchIcon />
          </span>

          <span onClick={clearInputHandler} className={s.inputCleanFieldIcon}>
            <CleanInputIcon />
          </span>
        </div>
      )}
      <label className={s.label}>
        {rest.label}
        <Component
          onBlur={onInputValueChangeHandler}
          required={required}
          value={inputValue}
          onChange={onInputValueChangeHandler}
          type={variant === 'password' && hidePass ? 'password' : 'text'}
          className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
          {...rest}
        />
        {required && error && <p className={s.error}>{error}</p>}
      </label>
    </div>
  )
}
