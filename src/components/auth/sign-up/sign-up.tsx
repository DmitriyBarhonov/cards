import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledInput } from '@/components/ui/controlled'

const classNames = {
  formContainer: clsx(s.formContainer),
  card: clsx(s.card),
  form: clsx(s.formBody),
  mainTitle: clsx(s.formTitle),
  input: clsx(s.formInput),
  submit: clsx(s.submitButton),
  question: clsx(s.bottomText),
  signIn: clsx(s.signLink),
}

const schema = z
  .object({
    email: z.string().email('Invalid email address').trim().nonempty('Enter email'),
    password: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 4 characters'),
    confirm: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 4 characters'),
  })
  .refine(data => data.password === data.confirm, {
    message: 'The password did not match',
    path: ['confirm'],
  })

export type SignUpFormType = z.infer<typeof schema>
export type FormType = Omit<SignUpFormType, 'confirm'>
export type SignUpProps = {
  onSubmit: (data: FormType) => void
}

export const SignUp = (props: SignUpProps) => {
  const { handleSubmit, control } = useForm<SignUpFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })
  const handleFormSubmitted = handleSubmit(data => {
    const { confirm, ...rest } = data

    props.onSubmit(rest)
  })

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <Typography className={classNames.mainTitle} variant={'large'}>
          {' '}
          Sign Up
        </Typography>
        <form className={classNames.form} onSubmit={handleFormSubmitted}>
          <ControlledInput
            className={classNames.input}
            variant={'standard'}
            label={'Email'}
            name={'email'}
            control={control}
            placeholder={'Email'}
          />
          <ControlledInput
            className={classNames.input}
            variant={'password'}
            placeholder={'Password'}
            label={'Password'}
            name={'password'}
            control={control}
          />
          <ControlledInput
            className={classNames.input}
            variant={'password'}
            placeholder={'Password'}
            label={'Confirm password'}
            name={'confirm'}
            control={control}
          />
          <Button className={classNames.submit} type="submit">
            Sign Up
          </Button>
        </form>
        <Typography className={classNames.question} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography as={Link} to={'/login'} className={classNames.signIn} variant={'h3'}>
          Sign In
        </Typography>
      </Card>
    </div>
  )
}
