import { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'
import { useSignUpMutation } from '@/services/auth'

export const SignUpPage: FC = () => {
  const [register, result] = useSignUpMutation()

  if (result.isSuccess) return <Navigate to={'/login'} />

  return <SignUp onSubmit={register} />
}
