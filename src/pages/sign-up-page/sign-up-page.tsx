import { Navigate } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'
import { useSignUpMutation } from '@/services/auth'

export const SignUpPage: React.FC = () => {
  const [register, result] = useSignUpMutation()

  if (result.isSuccess) return <Navigate to={'/login'} />

  return <SignUp onSubmit={register} />
}
