import { CheckEmail } from '@/components/auth/check-email'
import { SignIn } from '@/components/auth/sign-in'
import { SignUp } from '@/components/auth/sign-up'
import { Header } from '@/components/ui'

export function App() {
  return (
    <div>
      <Header isAuth={false} onSignIn={() => ({})} />
      <CheckEmail />
      <SignIn />
      <SignUp />
    </div>
  )
}
