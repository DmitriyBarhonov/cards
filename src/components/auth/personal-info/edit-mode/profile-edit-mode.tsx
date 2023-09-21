import { FC } from 'react'

import { clsx } from 'clsx'

import s from '@/components/auth/personal-info/personal-info.module.scss'
import { Button } from '@/components/ui'
import { InputField } from '@/components/ui/inputField'

type Props = {
  onInputBlurHandler: () => void
}
export const ProfileEditMode: FC<Props> = ({ onInputBlurHandler }) => {
  const classNames = {
    input: clsx(s.formInput),
    submit: clsx(s.submitButton),
  }

  //TODO here we should use controlled input
  return (
    <>
      <InputField onBlur={onInputBlurHandler} className={classNames.input} label={'Nickname'} />
      <Button className={classNames.submit} variant={'primary'}>
        Save Changes
      </Button>
    </>
  )
}
