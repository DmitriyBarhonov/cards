import { FC } from 'react'

import { clsx } from 'clsx'

import s from '@/components/auth/personal-info/personal-info.module.scss'
import { Button, CardsInput } from '@/components/ui'

type Props = {
  onInputBlurHandler: () => void
}
export const ProfileEditMode: FC<Props> = ({ onInputBlurHandler }) => {
  const classNames = {
    input: clsx(s.formInput),
    submit: clsx(s.submitButton),
  }

  return (
    <>
      <CardsInput onBlur={onInputBlurHandler} className={classNames.input} label={'Nickname'} />
      <Button className={classNames.submit} variant={'primary'}>
        Save Changes
      </Button>
    </>
  )
}
