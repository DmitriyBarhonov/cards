import { FC } from 'react'

import { clsx } from 'clsx'
import { Link } from 'react-router-dom'

import s from './personal-info.module.scss'

import { Avatar, Button, Card, Typography } from '@/components/ui'

export type PersonalInfoProps = {
  name?: string
  avatar?: string
  onInputValueChange?: (value: string) => void
}

export const PersonalInfo: FC<PersonalInfoProps> = ({ name, avatar, ...restProps }) => {
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
  const nameForPersonalInfo = name ? name : 'Kilobucks Lover'
  const imgForPersonalInfo = avatar
    ? avatar
    : 'https://kartinkof.club/uploads/posts/2022-03/1648314602_1-kartinkof-club-p-negr-dumaet-mem-1.jpg'

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <form className={classNames.form}>
          <Typography className={classNames.mainTitle} variant={'large'}>
            {' '}
            Personal Information
          </Typography>
          <Avatar name={nameForPersonalInfo} avatar={imgForPersonalInfo} />

          <Typography className={classNames.info} variant={'body2'}>
            {' '}
            Enter your email address and we will send you further instructions
          </Typography>
        </form>
        <Button className={classNames.submit} type="submit">
          Send Instructions
        </Button>
        <Typography className={classNames.question} variant={'body2'}>
          {' '}
          Did you remember your password?
        </Typography>
        <Typography as={'a'} href={''} className={classNames.signIn} variant={'h3'}>
          {' '}
          <Link to="/login">Try logging in</Link>
        </Typography>
      </Card>
    </div>
  )
}
