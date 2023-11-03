import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth'
import { useGetMeQuery } from '@/services/auth'

export const SignInPage = () => {
  const { data: me } = useGetMeQuery()

  if (me && me?.success !== false) return <Navigate to={'/'} />

  return <SignIn />
}
