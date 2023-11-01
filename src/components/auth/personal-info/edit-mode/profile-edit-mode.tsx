import { FC } from 'react'

import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'

import s from '@/components/auth/personal-info/personal-info.module.scss'
import { Button, Input } from '@/components/ui'
import { useUpdateMeMutation } from '@/services/auth'
import { UserDataUpdate } from '@/services/auth/auth.types'

type Props = {
  onInputBlurHandler: () => void
  name: string
}
export const ProfileEditMode: FC<Props> = ({ onInputBlurHandler, name }) => {
  const [updateMe] = useUpdateMeMutation()

  const classNames = {
    input: clsx(s.formInput),
    submit: clsx(s.submitButton),
  }

  const { register, handleSubmit } = useForm<UserDataUpdate>()

  const handleFormSubmitted = handleSubmit(data => {
    updateMe(data)
    onInputBlurHandler()
  })

  return (
    <>
      <form onSubmit={handleFormSubmitted}>
        <Input
          {...register('name')}
          autoFocus
          // onBlur={onInputBlurHandler} не работает из-за этого кнопка, ищу другой вариант
          className={classNames.input}
          label={'Nickname'}
          defaultValue={name}
        />
        <Button type="submit" className={classNames.submit} variant={'primary'}>
          Save Changes
        </Button>
      </form>
    </>
  )
}
