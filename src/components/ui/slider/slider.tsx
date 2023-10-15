import { FC, useEffect, useState } from 'react'

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
  const [rangeValue, setRangeValue] = useState<number[]>([0, 25])
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)

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
    container: clsx(s.rangeContainer),
    num: clsx(s.rangeDigit),
    toggleGroup: clsx(s.rangeDigit),
    slider: clsx(s.sliderRoot),
    track: clsx(s.sliderTrack),
    range: clsx(s.sliderRange),
    thumb: clsx(s.range),
  }

  const onRangeValueChange = (value: number[]) => {
    setRangeValue(value)

    if (timerId) clearTimeout(timerId)
    const newTimerId = setTimeout(() => {
      restProps.onValueChange && restProps.onValueChange(value[0], value[1])
    }, 1500)

    setTimerId(newTimerId)
  }

  return (
    <div className={classNames.container}>
      <Typography className={classNames.num} variant={'h3'}>
        {rangeValue[0]}
      </Typography>

      <Slider.Root
        className={classNames.slider}
        onValueChange={onRangeValueChange}
        defaultValue={[0, 25]}
        max={(restProps.maxCardsAmount && restProps.maxCardsAmount) || 50}
        step={1}
        minStepsBetweenThumbs={2}
      >
        <Slider.Track className={classNames.track}>
          <Slider.Range className={classNames.range} />
        </Slider.Track>
        <Slider.Thumb className={classNames.thumb} aria-label="min-amount" />
        <Slider.Thumb className={classNames.thumb} aria-label="max-amount" />
      </Slider.Root>
      <Typography className={classNames.num} variant={'h3'}>
        {rangeValue[1]}
      </Typography>
    </div>
  )
}
