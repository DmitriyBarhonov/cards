import { FC } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/controlled'
import { ControlledInput } from '@/components/ui/controlled-input'

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
const schema = z.object({
  email: z.string().email('Invalid email address').trim().nonempty('Enter email'), //мыло должно быть формата строка, типа почта(а@a@), убрать пробелы, не пустой
  password: z
    .string()
    .trim()
    .nonempty('Enter password')
    .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
  rememberMe: z.boolean().optional(), //если не будет optional, то всегда надо нажимать галочку, а это не надо
})

export type SignInFormType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type SignInProps = {
  // value?: string
  // onInputValueChange?: (value: string) => void
  onSubmit: (data: SignInFormType) => void //при сабмите отправляем данные типа мыло, пароль, запомниМеня
}


// type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean
// }не нужно, берем из схемы
export const SignIn = (props: SignInProps) => {
  const { handleSubmit, control } = useForm<SignInFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // const onSubmit = (data: SignInFormType) => {
  //   console.log(data)
  //   console.log(props)
  // } //оставила для проверки что приходит, сабмит получаем из пропсов

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  // const methods = useForm()
  //
  // // register который мы передаем в формы
  // // name: "email"
  // // onBlur: async (event) => {…}
  // // onChange: async (event) => {…}
  // // ref: (ref) => {…}
  // console.log(methods)

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <Typography className={classNames.mainTitle} variant={'large'}>
          Sign In
        </Typography>
        <form className={classNames.form} onSubmit={handleFormSubmitted}>
          <ControlledInput
            className={classNames.input}
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
          <ControlledCheckbox
            // name передаем такой же как и в типизации
            name="rememberMe"
            className={classNames.rememberMe}
            label={'Remember me'}
            // Передаем control
            control={control}
          />
          <Typography
            as={Link}
            to="/forgot-password"
            className={classNames.forgotPass}
            variant={'link1'}
          >
            {' '}
            <Link to="/forgot-password">Forgot Password?</Link>
          </Typography>
          <Button fullWidth={false} className={classNames.submit} type="submit">
            Sign in
          </Button>
        </form>
        <Typography className={classNames.question} variant={'body2'}>
          {`Don't have an account?`}
        </Typography>
        <Typography as={Link} to={'/sign-up'} className={classNames.signUp} variant={'h3'}>
          {/* передаем как компонент Link из роутер дома и переходим по пути что пишем в to */}
          Sign Up
        </Typography>
      </Card>
    </div>
  )
}
