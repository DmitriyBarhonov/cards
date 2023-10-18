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
  min?: number
  max?: number
  onChange: (min: number, max: number) => void
  className?: string
  value: number[]
}
export const SliderForCards: FC<TabSwitcherProps> = ({
  options,
  disabled,
  onChange,
  min,
  max,
  ...restProps
}) => {
  const [rangeValue, setRangeValue] = useState<number[]>(restProps.value)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)
  const classNames = {
    container: clsx(s.rangeContainer),
    num: clsx(s.rangeDigit),
    toggleGroup: clsx(s.rangeDigit),
    slider: clsx(s.sliderRoot),
    track: clsx(s.sliderTrack),
    range: clsx(s.sliderRange),
    thumb: clsx(s.range),
  }

  // const a = (value: any) => {
  //   if (timerId) clearTimeout(timerId)
  //   const newTimerId = setTimeout(() => {
  //     onChange(value[0], value[1])
  //   }, 1500)

  //   setTimerId(newTimerId)
  // }

  const onRangeValueChange = (value: number[]) => {
    onChange(value[0], value[1])
    setRangeValue(restProps.value)
  }

  return (
    <div className={classNames.container}>
      <Typography className={classNames.num} variant={'h3'}>
        {restProps.value[0]}
      </Typography>

      <Slider.Root
        className={classNames.slider}
        onValueChange={onRangeValueChange}
        // defaultValue={rangeValue}
        max={max}
        min={min}
        step={1}
        minStepsBetweenThumbs={2}
        value={restProps.value}
      >
        <Slider.Track className={classNames.track}>
          <Slider.Range className={classNames.range} />
        </Slider.Track>
        <Slider.Thumb className={classNames.thumb} aria-label="min-amount" />
        <Slider.Thumb className={classNames.thumb} aria-label="max-amount" />
      </Slider.Root>
      <Typography className={classNames.num} variant={'h3'}>
        {restProps.value[1]}
      </Typography>
    </div>
  )
}

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
