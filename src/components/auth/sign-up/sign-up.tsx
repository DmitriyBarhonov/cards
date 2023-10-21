import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
// import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledInput } from '@/components/ui/controlled-input'

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
    email: z.string().email('Invalid email address').trim().nonempty('Enter email'), //мыло должно быть формата строка, типа почта(а@a@), убрать пробелы, не пустой
    password: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа
    confirm: z
      .string()
      .trim()
      .nonempty('Enter password')
      .min(4, 'Password must be at least 4 characters'), //как минимум 4 символа, //если не будет optional, то всегда надо нажимать галочку, а это не надо
  })
  .refine(data => data.password === data.confirm, {
    message: 'The password did not match', //доп проверка чтобы пароли совпадали
    path: ['confirm'], //если будет ошибка то вывести в поле confirm
  })

export type SignUpFormType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type FormType = Omit<SignUpFormType, 'confirm'>
export type SignUpProps = {
  // value?: string
  // onInputValueChange?: (value: string) => void
  onSubmit: (data: FormType) => void //при сабмите отправляем данные типа мыло, пароль, подтверждение пароля
}

// type FormValues = {
//   email: string
//   password: string
// } //не нужно, берем из схемы автоматически
//чтобы оба поля содержали один и тот же новый пароль

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

  //рабочий Викин код
  //const handleFormSubmitted = handleSubmit(props.onSubmit)
  //нам не надо на сервер отправлять confirm, поэтому
  //с помощью библиотечки лоудаш исключаем его из отправлемых данных
  //убрала confirm по другому
  const handleFormSubmitted = handleSubmit(data => {
    //     const formData = omit(data, ['confirm']) // Исключаем поле 'confirm' из данных формы
    const { confirm, ...rest } = data

    // console.log(rest)
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
          {/* передаем как компонент Link из роутер дома и переходим по пути что пишем в to */}
          {/*<Typography as={'a'} href={''} className={classNames.signIn} variant={'h3'}>*/}
          {/*  <Link to="/login">Sign In</Link> используем типографию как надо */}
        </Typography>
      </Card>
    </div>
  )
}
