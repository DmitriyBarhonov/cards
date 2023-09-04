import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './forgot-pass.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { CardsInput } from '@/components/ui/input'

export type ForgotPassProps = {
  value?: string
  onInputValueChange?: (value: string) => void
}

type FormValues = {
  email: string
  password: string
}
export const ForgotPass = () => {
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
    question: clsx(s.bottomText),
    signIn: clsx(s.signLink),
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            {' '}
            Forgot your password?
          </Typography>
          <CardsInput
            className={classNames.input}
            variant={'standard'}
            {...register('email')}
            label={'Email'}
          />

          <Typography className={classNames.info} variant={'body2'}>
            {' '}
            Enter your email address and we will send you further instructions
          </Typography>
        </form>
        <Button className={classNames.submit} type="submit">
          Send Instructions
        </Button>
        <Typography className={classNames.question} variant={'body2'}>
          {' '}
          Did you remember your password?
        </Typography>
        <Typography as={'a'} href={''} className={classNames.signIn} variant={'h3'}>
          {' '}
          <Link to="/login">Try logging in</Link>
        </Typography>
      </Card>
    </div>
  )
}
