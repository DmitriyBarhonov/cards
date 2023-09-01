import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'

import s from './set-new-pass.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { CardsInput } from '@/components/ui/input'

export type SetNewPassProps = {
  value?: string
  onInputValueChange?: (value: string) => void
}

type FormValues = {
  email: string
  password: string
}
export const SetNewPass = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const classNames = {
    formContainer: clsx(s.formContainer),
    card: clsx(s.card),
    form: clsx(s.formBody),
    mainTitle: clsx(s.formTitle),
    input: clsx(s.formInput),
    info: clsx(s.secondaryText),
    submit: clsx(s.submitButton),
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            {' '}
            Create new password
          </Typography>
          <CardsInput
            className={classNames.input}
            variant={'password'}
            {...register('password')}
            label={'New password'}
          />
          <Typography className={classNames.info} variant={'body2'}>
            {' '}
            Create new password and we will send you further instructions to email{' '}
          </Typography>
        </form>
        <Button className={classNames.submit} type="submit">
          Create New Password
        </Button>
      </Card>
    </div>
  )
}
