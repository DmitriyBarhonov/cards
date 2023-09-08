import { useController, UseControllerProps } from 'react-hook-form'

import { CardsInput, CardsInputProps } from '../input'

//ControlledInputProps расширяет UseControllerProps<any>
// и исключает некоторые свойства из CardsInputProps, такие как
// onChange, value и id. Это означает, что ControlledInputProps
// принимает все свойства UseControllerProps
// и все свойства CheckboxProps, кроме указанных.
export type ControlledInputProps = UseControllerProps<any> &
  Omit<CardsInputProps<any>, 'onChange' | 'value' | 'id'>

//ControlledInput - это функциональный компонент, который принимает
// name, rules, shouldUnregister, control, defaultValue
// из ControlledInputProps и остальные свойства из CardsInputProps
export const ControlledInput = ({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...inputProps
}: ControlledInputProps) => {
  //Затем компонент использует хук useController из react-hook-form
  // для получения контроллера для управления полем ввода.
  // useController возвращает объект field, содержащий свойства onChange и value
  const {
    field: { onChange, value },
  } = useController({ name, rules, shouldUnregister, control, defaultValue })

  return (
    <CardsInput
      {...{
        onValueChange: onChange,
        checked: value,
        id: name,
        ...inputProps,
      }}
    />
  )
}
