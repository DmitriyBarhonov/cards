import { FC, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

type ToggleOptionsType = {
  label: string
  value: string
}

type TabSwitcherProps = {
  options?: ToggleOptionsType[]
  disabled?: boolean
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  value?: any
}
export const SliderForCards: FC<TabSwitcherProps> = ({ options, disabled, ...restProps }) => {
  const classNames = {
    toggleGroup: clsx(disabled ? s.toggleDisabled : s.toggleGroup),
    toggleGroupItem: clsx(disabled ? s.toggleDisabledItem : s.toggleGroupItem),
  }

  const oValueChangeHandler = (value: string) => {
    //здесь будет отправляться запрос на показ
    //всех или только моих карточек
    restProps.onValueChange && restProps.onValueChange(value)
  }

  return (
    <Slider.Root
      className={s.SliderRoot}
      defaultValue={[25, 75]}
      max={100}
      step={1}
      minStepsBetweenThumbs={1}
    >
      <Slider.Track className={s.SliderTrack}>
        <Slider.Range className={s.SliderRange} />
      </Slider.Track>
      <Slider.Thumb className={s.SliderThumb} aria-label="min-amount" />
      <Slider.Thumb className={s.SliderThumb} aria-label="max-amount" />
    </Slider.Root>
  )
}
