import { FC, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

import { CardsInput, Typography } from '@/components/ui'
import { ControlledInput } from '@/components/ui/controlled-input'

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
  const [rangeValue, setRangeValue] = useState([0, 20])
  const [editMode, setEditMode] = useState(false)

  const classNames = {
    toggleGroup: clsx(disabled ? s.toggleDisabled : s.toggleGroup),
    toggleGroupItem: clsx(disabled ? s.toggleDisabledItem : s.toggleGroupItem),
  }
  const activateEditMode = () => {
    setEditMode(true)
  }
  const turnOffEditMode = () => {
    setEditMode(false)
  }
  const oValueChangeHandler = (value: number | number[]) => {
    //проверяем еслим массив, если да до отправляем оба значения
    if (Array.isArray(value)) {
      setRangeValue(value)
      restProps.onValueChange && restProps.onValueChange(value[0], value[1])
    }
    // если пришел не массив а одно число
    //решаем каким оно будет, минимальным или максимальным
    else {
      console.log(value)
      if (value > rangeValue[0]) {
        setRangeValue([rangeValue[1], value])
        restProps.onValueChange && restProps.onValueChange(rangeValue[1], value)
      } else if (value < rangeValue[0]) {
        setRangeValue([value, rangeValue[1]])
        restProps.onValueChange && restProps.onValueChange(value, rangeValue[1])
      }
    }
    if (rangeValue[1] < rangeValue[0]) {
      let biggerDigit = rangeValue[0]

      setRangeValue([rangeValue[1], biggerDigit])
    }
  }

  return (
    <div className={s.rangeContainer}>
      {editMode ? (
        <CardsInput
          className={s.rangeInput}
          onBlur={turnOffEditMode}
          value={rangeValue[0]}
          onInputValueChange={oValueChangeHandler}
        />
      ) : (
        <Typography onDoubleClick={activateEditMode} className={s.rangeDigit} variant={'body2'}>
          {rangeValue[0]}
        </Typography>
      )}

      <Slider.Root
        className={s.SliderRoot}
        onValueChange={oValueChangeHandler}
        defaultValue={rangeValue}
        max={(restProps.maxCardsAmount && restProps.maxCardsAmount) || 100}
        step={1}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className={s.SliderTrack}>
          <Slider.Range className={s.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={s.SliderThumb} aria-label="min-amount" />
        <Slider.Thumb className={s.SliderThumb} aria-label="max-amount" />
      </Slider.Root>
      <Typography variant={'body2'}>{rangeValue[1]}</Typography>
    </div>
  )
}
