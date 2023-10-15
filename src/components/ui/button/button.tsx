import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon'
  fullWidth?: boolean
  fullWidthForModal?: boolean
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    fullWidthForModal,
    className,
    as: Component = 'button',
    ...rest
  } = props

  //пересмотреть использование fullWidth
  //скорее всего это свойство можно будет выпилить т.к. по факту
  //используется fullWidthForModal

  return (
    <Component
      className={`${s[variant]} ${fullWidthForModal ? s.fullWidthForModal : ''} ${
        fullWidth ? s.fullWidth : ''
      } ${className}`}
      {...rest}
    />
  )
}
