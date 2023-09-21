import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import s from './inputField.module.scss'

import { CleanInputIcon } from '@/assets/icons/CleanInput.tsx'
import { SearchIcon } from '@/assets/icons/Search.tsx'
import { WatchPassIcon } from '@/assets/icons/WatchPass.tsx'
import { CrossedOutWatchPassIcon } from '@/assets/icons/WatchPassCrossedOut.tsx'

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
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  //Здесь HTMLInputElement - это тип ref, который
  // мы хотим передать в дочерний компонент,
  // а InputFieldProps - это тип пропсов,
  // которые мы хотим передать в дочерний компонент.
  //
  // Таким образом, мы указываем, что компонент
  // InputField принимает пропсы типа InputFieldProps
  // и может принимать ref типа HTMLInputElement.
  // Это позволяет нам использовать ref внутри
  // компонента для получения ссылки на input элемент.
  (
    { required, value, onInputValueChange, variant = 'standard', fullWidth, className, ...rest },
    ref
  ) => {
    debugger

    const [hidePass, setHidePass] = useState(true)
    const [inputValue, setInputValue] = useState((value && value) || '')

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
    const valueForInput = variant === 'search' ? inputValue : undefined
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
      clearFieldIcon: clsx(s.inputCleanFieldIcon, rest.disabled && s.disabledIcon),
      inputLabel: clsx(s.label, rest.disabled && s.disabledLabel),
      error: clsx(s.error),
      inputField: clsx(
        s[variant],
        rest.errorMessage && s.errorInput
        //fullWidth && s.fullWidth,
        //className,
      ),
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
        {/*логика показа кнопок поиска и очищения поля*/}
        {isInputSearch && (
          <div className={classNames.searchIconsContainer}>
            <SearchIcon className={classNames.searchIcon} />
            {inputValue && (
              <CleanInputIcon onClick={clearInputHandler} className={classNames.clearFieldIcon} />
            )}
          </div>
        )}

        <label className={classNames.inputLabel}>
          {rest.label}
          <input
            ref={ref}
            onBlur={onInputValueChangeHandler}
            required={required}
            value={(value && value) || valueForInput}
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
