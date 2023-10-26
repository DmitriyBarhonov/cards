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
  const [updateInfo] = useUpdateMeMutation()

  const classNames = {
    input: clsx(s.formInput),
    submit: clsx(s.submitButton),
  }

  const { register, handleSubmit } = useForm<UserDataUpdate>()

  const updateUserDataHandler = (data: UserDataUpdate) => {
    updateInfo(data)
    onInputBlurHandler()
  }

  //TODO here we probably should use controlled input
  return (
    <>
      <form onSubmit={handleSubmit(updateUserDataHandler)}>
        <Input
          {...register('name')}
          onBlur={onInputBlurHandler}
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
