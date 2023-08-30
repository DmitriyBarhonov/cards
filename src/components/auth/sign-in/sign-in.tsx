import { ChangeEvent, ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'

import s from './sign-in.module.scss'

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
export const SignIn = (props: SignInProps) => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const classNames = {
    signInContainer: clsx(s.signInContainer),
    mainTitle: clsx(s.signInMainTitle),
    watchPassButton: clsx(s.watchPassButton),
  }

  return (
    <Card className={classNames.signInContainer}>
      <Typography className={classNames.mainTitle} variant={'large'}>
        {' '}
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardsInput variant={'standard'} value={''} {...register('email')} label={'Email'} />
        <CardsInput variant={'password'} value={''} {...register('password')} label={'Password'} />
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  )
}
