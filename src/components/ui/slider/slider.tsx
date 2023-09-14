import { FC, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

import { Typography } from '@/components/ui'

type ToggleOptionsType = {
  label: string
  value: string
}

type TabSwitcherProps = {
  options?: ToggleOptionsType[]
  disabled?: boolean
  defaultValue?: string
  maxCardsAmount?: number
  onValueChange?: (min: number, max: number) => void
  className?: string
  value?: any
}
export const SliderForCards: FC<TabSwitcherProps> = ({ options, disabled, ...restProps }) => {
  const [rangeValue, setRangeValue] = useState([0, 25])

  //  на случай если захочется сделать инпуты
  // по бокам от слайдера
  //  const [editMode, setEditMode] = useState(false)
  // const activateEditMode = () => {
  //   setEditMode(true)
  // }
  // const turnOffEditMode = () => {
  //   setEditMode(false)
  // }
  // const oValueChangeHandler = (value: number | number[]) => {
  //   //проверяем еслим массив, если да до отправляем оба значения
  //   if (Array.isArray(value)) {
  //     setRangeValue(value)
  //     restProps.onValueChange && restProps.onValueChange(value[0], value[1])
  //   }
  //   // если пришел не массив а одно число
  //   //решаем каким оно будет, минимальным или максимальным
  //   else {
  //     console.log(value)
  //     if (value > rangeValue[0]) {
  //       setRangeValue([rangeValue[1], value])
  //       restProps.onValueChange && restProps.onValueChange(rangeValue[1], value)
  //     } else if (value < rangeValue[1]) {
  //       setRangeValue([value, rangeValue[1]])
  //       restProps.onValueChange && restProps.onValueChange(value, rangeValue[1])
  //     }
  //   }
  //   if (rangeValue[1] < rangeValue[0]) {
  //     let biggerDigit = rangeValue[0]
  //
  //     setRangeValue([rangeValue[1], biggerDigit])
  //   }
  // }

  const classNames = {
    toggleGroup: clsx(disabled ? s.toggleDisabled : s.toggleGroup),
    toggleGroupItem: clsx(disabled ? s.toggleDisabledItem : s.toggleGroupItem),
  }

  const onRangeValueChange = (value: number[]) => {
    setRangeValue(value)
    restProps.onValueChange && restProps.onValueChange(value[0], value[1])
  }

  return (
    <div className={s.rangeContainer}>
      <Typography className={s.rangeDigit} variant={'h3'}>
        {rangeValue[0]}
      </Typography>

      <Slider.Root
        className={s.sliderRoot}
        onValueChange={onRangeValueChange}
        defaultValue={[0, 25]}
        max={(restProps.maxCardsAmount && restProps.maxCardsAmount) || 150}
        step={1}
        minStepsBetweenThumbs={2}
      >
        <Slider.Track className={s.sliderTrack}>
          <Slider.Range className={s.sliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.sliderThumb} aria-label="min-amount" />
        <Slider.Thumb className={s.sliderThumb} aria-label="max-amount" />
      </Slider.Root>
      <Typography className={s.rangeDigit} variant={'h3'}>
        {rangeValue[1]}
      </Typography>
    </div>
  )
}
