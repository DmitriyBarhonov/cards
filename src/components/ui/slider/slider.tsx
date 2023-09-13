import { FC, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

type ToggleOptionsType = {
  label: string
  value: string
}

type TabSwitcherProps = {
  options: ToggleOptionsType[]
  disabled?: boolean
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  value?: any
}
export const SliderForCards: FC<TabSwitcherProps> = ({ options, disabled, ...restProps }) => {
  const [value, setValue] = useState(options[1].value)

  const classNames = {
    toggleGroup: clsx(disabled ? s.toggleDisabled : s.toggleGroup),
    toggleGroupItem: clsx(disabled ? s.toggleDisabledItem : s.toggleGroupItem),
  }

  const oValueChangeHandler = (value: string) => {
    if (value) setValue(value)
    //здесь будет отправляться запрос на показ
    //всех или только моих карточек
    restProps.onValueChange && restProps.onValueChange(value)
  }

  return (
    <Slider.Root className={s.SliderRoot} defaultValue={[50]} max={100} step={1}>
      <Slider.Track className={s.SliderTrack}>
        <Slider.Range className={s.SliderRange} />
      </Slider.Track>
      <Slider.Thumb className={s.SliderThumb} aria-label="min-amount" />
      <Slider.Thumb className={s.SliderThumb} aria-label="max-amount" />
    </Slider.Root>
  )
}
