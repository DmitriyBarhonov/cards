import { FC } from 'react'

import { clsx } from 'clsx'

import s from '@/components/auth/personal-info/personal-info.module.scss'
import { Button, Input } from '@/components/ui'

type Props = {
  onInputBlurHandler: () => void
}
export const ProfileEditMode: FC<Props> = ({ onInputBlurHandler }) => {
  const classNames = {
    input: clsx(s.formInput),
    submit: clsx(s.submitButton),
  }

  //TODO here we probably should use controlled input
  return (
    <>
      <Input onBlur={onInputBlurHandler} className={classNames.input} label={'Nickname'} />
      <Button className={classNames.submit} variant={'primary'}>
        Save Changes
      </Button>
    </>
  )
}
