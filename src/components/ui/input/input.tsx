import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './input.module.scss'

// @ts-ignore
import SearchIcon from '@/assets/icons/Search'
import { WatchPassIcon } from '@/assets/icons/watch-pass'
import { CrossedOutWatchPassIcon } from '@/assets/icons/watch-pass-crossed-out'

export type InputFieldProps = {
  label?: string
  required?: boolean
  errorMessage?: string
  value?: string
  onInputValueChange?: (value: string) => void
  variant?: 'standard' | 'password' | 'search'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'input'>

// Обернул forwardRef для передачи ref

// forwardRef - это функция высшего порядка в React,
// которая позволяет передавать ref из
// родительского компонента в дочерний компонент.
export const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  //Здесь HTMLInputElement - это тип ref, который
  // мы хотим передать в дочерний компонент,
  // а InputFieldProps - это тип пропсов,
  // которые мы хотим передать в дочерний компонент.
  //
  // Таким образом, мы указываем, что компонент
  // Input принимает пропсы типа InputFieldProps
  // и может принимать ref типа HTMLInputElement.
  // Это позволяет нам использовать ref внутри
  // компонента для получения ссылки на input элемент.
  (
    { required, value, onInputValueChange, variant = 'standard', fullWidth, className, ...rest },
    ref
  ) => {
    const [hidePass, setHidePass] = useState(true)

    const toggleWatchPassword = () => {
      setHidePass(!hidePass)
    }

    const onInputValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onInputValueChange?.(e.currentTarget.value)
    }
    const isInputSearch = variant === 'search'
    const isInputPass = variant === 'password'
    //если тип пароль (+ hidePass всегда по умолчанию включен) то типом
    // ипнута будет password, если нет то проверяем след.выражение
    // если вариант search то передаем в инпут type search  для того,
    // чтобы появилась нативная кнопка очищения поля.
    // И елси уже никакое из предыдущих двух условии не валидно
    // тогда инпут будет обычным текстом
    // eslint-disable-next-line no-nested-ternary
    const inputType = isInputPass && hidePass ? 'password' : isInputSearch ? 'search' : 'text'

    const classNames = {
      inputContainer: clsx(s.inputContainer, className, fullWidth && s.fullWidth),
      watchPassButton: clsx(s.watchPassButton, rest.disabled && s.disabledIcon),
      searchIconsContainer: clsx(s.inputIconsContainer),
      searchIcon: clsx(s.inputSearchIcon, rest.disabled && s.disabledIcon),
      inputLabel: clsx(s.label, rest.disabled && s.disabledLabel),
      inputLabelText: clsx(s.inputLabelText),
      error: clsx(s.error),
      inputField: clsx(s[variant], rest.errorMessage && s.errorInput),
    }

    return (
      <div className={classNames.inputContainer}>
        {/*логика кнопки show password*/}
        {isInputPass && (
          <button
            type={'button'}
            disabled={rest.disabled}
            className={classNames.watchPassButton}
            onClick={toggleWatchPassword}
          >
            {hidePass ? <WatchPassIcon /> : <CrossedOutWatchPassIcon />}
          </button>
        )}
        {/*логика показа кнопки поиска*/}
        {isInputSearch && (
          <div className={classNames.searchIconsContainer}>
            <SearchIcon className={classNames.searchIcon} />
          </div>
        )}

        <label className={classNames.inputLabel}>
          <span className={classNames.inputLabelText}>{rest.label}</span>
          <input
            ref={ref}
            onBlur={onInputValueChangeHandler}
            required={required}
            value={value && value}
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
)
