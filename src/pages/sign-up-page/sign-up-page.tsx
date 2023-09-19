import { Navigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'
import { useGetMeQuery, useSignUpMutation } from '@/services/auth'

export const SignUpPage = () => {
  const [register] = useSignUpMutation()
  //TODO сделать редирект на логин после успешной регистрации
  const { data: me } = useGetMeQuery()

  if (me && me?.success !== false) return <Navigate to={'/login'} />

  return <SignUp onSubmit={register} />
}
