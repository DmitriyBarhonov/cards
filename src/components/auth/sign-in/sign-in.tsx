import { clsx } from 'clsx'
import { useController, useForm } from 'react-hook-form'

import s from './sign-in.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { Checkbox } from '@/components/ui/checkbox'
import { CardsInput } from '@/components/ui/input'

export type SignInProps = {
  value?: string
  onInputValueChange?: (value: string) => void
}

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}
export const SignIn = () => {
  const { register, handleSubmit, control } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const {
    field: { value, onChange },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

  const classNames = {
    formContainer: clsx(s.formContainer),
    card: clsx(s.card),
    form: clsx(s.signInForm),
    mainTitle: clsx(s.mainTitle),
    input: clsx(s.signInInput),
    rememberMe: clsx(s.rememberMe),
    forgotPass: clsx(s.forgotPasswordLink),
    submit: clsx(s.submitButton),
    question: clsx(s.bottomText),
    signUp: clsx(s.signUpLink),
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            {' '}
            Sign In
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
          <Checkbox
            checked={value}
            onValueChange={onChange}
            className={classNames.rememberMe}
            label={'Remember me'}
          />

          <Typography as={'a'} href={''} className={classNames.forgotPass} variant={'link1'}>
            {' '}
            Forgot Password?
          </Typography>
          <Button fullWidth={false} className={classNames.submit} type="submit">
            Sign in
          </Button>
        </form>
        <Typography className={classNames.question} variant={'body2'}>
          {' '}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
        </Typography>
        <Typography as={'a'} href={''} className={classNames.signUp} variant={'h3'}>
          {' '}
          Sign Up
        </Typography>
      </Card>
    </div>
  )
}
