import { UseControllerProps, useController } from 'react-hook-form'

import { RadioGroupComponet, RadioGroupProps } from '../radio-group/radio-group'

export type ControlledRadioProps = UseControllerProps<any> &
  Omit<RadioGroupProps, 'onChange' | 'value' | 'id'>

export const ControlledRadioGroup = ({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  options,
  disabled,
  ...radioGroupProps
}: ControlledRadioProps) => {
  const {
    field: { onChange, value },
  } = useController({ name, rules, shouldUnregister, control, defaultValue })

  return (
    <RadioGroupComponet
      {...{
        ...radioGroupProps,
        value: value,
        onValueChange: onChange,
        options: options,
        disabled: disabled,
        defaultValue,
      }}
    />
  )
}
