import { useNavigate } from 'react-router-dom'

import { ForgotPass, ForgotPassFormType } from '@/components/auth'
import { useRecoverPasswordMutation } from '@/services/auth'

export const ForgotPasswordPage = () => {
  const [recover] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const recoverHandler = (data: ForgotPassFormType) => {
    recover(data)
      .unwrap()
      .then(() => navigate('/check-your-email'))
      .catch(e => alert(e))
  }

  return <ForgotPass onSubmit={recoverHandler} />
}
