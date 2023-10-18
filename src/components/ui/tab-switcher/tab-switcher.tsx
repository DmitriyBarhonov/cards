import { FC, useState } from 'react'

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'

import s from './tab-switcher.module.scss'

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
  value?: string
}
export const TabSwitcher: FC<TabSwitcherProps> = ({ options, disabled, ...restProps }) => {
  const [value, setValue] = useState(restProps.defaultValue || restProps.value || options[1].value)
  //не хардкодим на второй элемент из options, если есть в пропсах value или defaultValue то берем их
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
    <ToggleGroup.Root
      className={`${classNames.toggleGroup} ${restProps.className}`}
      type="single"
      disabled={disabled}
      defaultValue={restProps.defaultValue || options[0].value}
      aria-label="Text alignment"
      loop={false}
      onValueChange={oValueChangeHandler}
      value={value}
    >
      {/*сколько options получим в пропсах*/}
      {/*столько кнопок в переключалке и отрисуется*/}
      {options.map((option: ToggleOptionsType) => {
        return (
          <ToggleGroup.Item
            key={option.value}
            className={classNames.toggleGroupItem}
            value={option.value}
            aria-label={option.label}
          >
            {option.label}
          </ToggleGroup.Item>
        )
      })}
    </ToggleGroup.Root>
  )
}
