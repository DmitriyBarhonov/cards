import { useController, UseControllerProps } from 'react-hook-form'

import { InputField, InputFieldProps } from '../inputField'

//import { CardsInput } from '@/components/ui'

//ControlledInputProps расширяет UseControllerProps<any>
// и исключает некоторые свойства из CardsInputProps, такие как
// onChange, value и id. Это означает, что ControlledInputProps
// принимает все свойства UseControllerProps
// и все свойства CheckboxProps, кроме указанных.
export type ControlledInputProps = UseControllerProps<any> &
  Omit<InputFieldProps, 'onChange' | 'value' | 'id'>

//ControlledInput - это функциональный компонент, который принимает
// name, rules, shouldUnregister, control, defaultValue
// из ControlledInputProps и остальные свойства из CardsInputProps
export const ControlledInput = ({
  name,
  // rules,
  // shouldUnregister,
  control, // defaultValue,
  ...props // ...inputProps
}: ControlledInputProps) => {
  //Затем компонент использует хук useController из react-hook-form
  // для получения контроллера для управления полем ввода.
  // useController возвращает объект field, содержащий свойства onChange и value
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return <InputField {...props} {...field} errorMessage={error?.message} id={props.label} />
  //return <CardsInput {...props} {...field} errorMessage={error?.message} id={props.label} />
}
