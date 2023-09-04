import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import s from './sign-in.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/controlled'
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

  // register который мы передаем в формы
  // name: "email"
  // onBlur: async (event) => {…}
  // onChange: async (event) => {…}
  // ref: (ref) => {…}

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
          <ControlledCheckbox
            // name передаем такой же как и в типизации
            name="rememberMe"
            className={classNames.rememberMe}
            label={'Remember me'}
            // Передаем control
            control={control}
          />

          <Typography as={'a'} href={''} className={classNames.forgotPass} variant={'link1'}>
            {' '}
            <Link to="/forgot-password">Forgot Password?</Link>
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
          <Link to="/sign-up">Sign Up</Link>
        </Typography>
      </Card>
    </div>
  )
}
