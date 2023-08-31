import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'

import s from './sign-up.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { CardsInput } from '@/components/ui/input'

export type SignInProps = {
  value?: string
  onInputValueChange?: (value: string) => void
}

type FormValues = {
  email: string
  password: string
}
export const SignUp = (props: SignInProps) => {
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
    submit: clsx(s.submitButton),
    haveAcc: clsx(s.dontHaveAcc),
    signIn: clsx(s.signLink),
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            {' '}
            Sign Up
          </Typography>
          <CardsInput
            className={classNames.input}
            variant={'standard'}
            {...register('email')}
            label={'Email'}
          />
          <CardsInput
            className={classNames.input}
            variant={'password'}
            {...register('password')}
            label={'Password'}
          />
          <CardsInput
            className={classNames.input}
            variant={'password'}
            {...register('password')}
            label={'Confirm Password'}
          />
        </form>
        <Button className={classNames.submit} type="submit">
          Sign Up
        </Button>
        <Typography className={classNames.haveAcc} variant={'body2'}>
          {' '}
          Already have an account?
        </Typography>
        <Typography as={'a'} href={''} className={classNames.signIn} variant={'h3'}>
          {' '}
          Sign In
        </Typography>
      </Card>
    </div>
  )
}
