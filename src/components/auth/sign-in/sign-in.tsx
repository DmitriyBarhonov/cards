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
    signInContainer: clsx(s.signInContainer),
    signInCard: clsx(s.signInFormContainer),
    mainTitle: clsx(s.signInMainTitle),
    form: clsx(s.signInFormContainer),
    rememberMe: clsx(s.rememberMeTitle),
    forgotPass: clsx(s.forgotPasswordLink),
    submit: clsx(s.submitButton),
  }

  return (
    <div className={classNames.signInContainer}>
      <Card className={classNames.signInCard}>
        <form className={classNames.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            {' '}
            Sign In
          </Typography>
          <CardsInput variant={'standard'} {...register('email')} label={'Email'} />
          <CardsInput variant={'password'} {...register('password')} label={'Password'} />
          <Checkbox label={'Remember me'} />
        </form>
        <Typography as={'a'} href={''} className={classNames.forgotPass} variant={'link1'}>
          {' '}
          Forgot Password?
        </Typography>
        <Button className={classNames.forgotPass} type="submit">
          Submit
        </Button>
      </Card>
    </div>
  )
}
