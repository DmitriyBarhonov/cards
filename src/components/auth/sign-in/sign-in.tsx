import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'

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
}
export const SignIn = (props: SignInProps) => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const classNames = {
    signInContainer: clsx(s.signInFormContainer),
    signInCard: clsx(s.signInCardContainer),
    form: clsx(s.signInForm),
    mainTitle: clsx(s.signInMainTitle),
    input: clsx(s.signInInput),
    rememberMe: clsx(s.rememberMe),
    forgotPass: clsx(s.forgotPasswordLink),
    submit: clsx(s.submitButton),
    haveAcc: clsx(s.dontHaveAcc),
    signUp: clsx(s.signUpLink),
  }

  return (
    <div className={classNames.signInContainer}>
      <Card className={classNames.signInCard}>
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
          <Checkbox className={classNames.rememberMe} label={'Remember me'} />
        </form>
        <Typography as={'a'} href={''} className={classNames.forgotPass} variant={'link1'}>
          {' '}
          Forgot Password?
        </Typography>
        <Button fullWidth={false} className={classNames.submit} type="submit">
          Sign in
        </Button>
        <Typography className={classNames.haveAcc} variant={'body2'}>
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
