import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './set-new-pass.module.scss'

import { Button, Card, Typography } from '@/components/ui'
// import { CardsInput } from '@/components/ui/input'
import { ControlledInput } from '@/components/ui/controlled-input'

const classNames = {
  formContainer: clsx(s.formContainer),
  card: clsx(s.card),
  form: clsx(s.formBody),
  mainTitle: clsx(s.formTitle),
  input: clsx(s.formInput),
  info: clsx(s.secondaryText),
  submit: clsx(s.submitButton),
}
const schema = z.object({
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
})

export type SetNewPassFormType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше

export type SetNewPassProps = {
  // value?: string
  // onInputValueChange?: (value: string) => void
  onSubmit: (data: SetNewPassFormType) => void //при сабмите отправляем данные пароль
}
// type FormValues = {
//   email: string
//   password: string
// } не нужны берем из схемы выше

export const SetNewPass = (props: SetNewPassProps) => {
  const { handleSubmit, control } = useForm<SetNewPassFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  })
  const handleFormSubmitted = handleSubmit(props.onSubmit)
  // const onSubmit = (data: FormValues) => {
  //   console.log(data)
  // }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <Typography className={classNames.mainTitle} variant={'large'}>
          Create new password
        </Typography>
        <form className={classNames.form} onSubmit={handleFormSubmitted}>
          <ControlledInput
            className={classNames.input}
            variant={'password'}
            placeholder={'Password'}
            label={'Password'}
            name={'password'}
            control={control}
          />
          <Typography className={classNames.info} variant={'body2'}>
            Create new password and we will send you further instructions to email
          </Typography>
          <Button className={classNames.submit} type="submit">
            Create New Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
