import { clsx } from 'clsx'

import s from './check-email.module.scss'

import { CheckEmailIcon } from '@/assets/icons/check-email-icon'
import { Button, Card, Typography } from '@/components/ui'

export type CheckEmailProps = {
  value?: string
  onInputValueChange?: (value: string) => void
}

export const CheckEmail = () => {
  const userEmail = ''

  const classNames = {
    formContainer: clsx(s.formContainer),
    card: clsx(s.card),
    mainTitle: clsx(s.mainTitle),
    icon: clsx(s.mainIcon),
    info: clsx(s.secondaryText),
    button: clsx(s.button),
  }

  return (
    <div className={classNames.formContainer}>
      <Card className={classNames.card}>
        <Typography className={classNames.mainTitle} variant={'large'}>
          {' '}
          Check Email
        </Typography>
        <CheckEmailIcon className={classNames.icon} />
        <Typography className={classNames.info} variant={'body1'}>
          {' '}
          We’ve sent an Email with instructions to {userEmail ? userEmail : 'example@mail.com'}
        </Typography>
        <Button as={'a'} href={''} fullWidth={false} className={classNames.button} type="submit">
          Back to Sign In
        </Button>
      </Card>
    </div>
  )
}
