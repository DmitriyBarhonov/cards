import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './forgot-pass.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledInput } from '@/components/ui/controlled-input'

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
const schema = z.object({
  email: z.string().email('Invalid email address').trim().nonempty('Enter email'),
})

export type ForgotPassFormType = z.infer<typeof schema>
export type ForgotPassProps = {
  onSubmit: (data: ForgotPassFormType) => void
}

export const ForgotPass = (props: ForgotPassProps) => {
  const { handleSubmit, control } = useForm<ForgotPassFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })
  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <Typography className={classNames.mainTitle} variant={'large'}>
          Forgot your password?
        </Typography>
        <form className={classNames.form} onSubmit={handleFormSubmitted}>
          <ControlledInput
            className={classNames.input}
            label={'Email'}
            name={'email'}
            control={control}
            placeholder={'Email'}
          />
          <Typography className={classNames.info} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={classNames.submit} type="submit">
            Send Instructions
          </Button>
        </form>
        <Typography className={classNames.question} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography as={Link} to={'/login'} className={classNames.signIn} variant={'h3'}>
          Try logging in
        </Typography>
      </Card>
    </div>
  )
}
