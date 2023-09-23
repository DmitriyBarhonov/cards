import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui'

export const Layout = () => {
  return (
    <div>
      <Header isAuth={true} onSignIn={() => {}} />
      <Outlet />
    </div>
  )
} //все просто, отрисуй всех детей с хэдэром сверху
