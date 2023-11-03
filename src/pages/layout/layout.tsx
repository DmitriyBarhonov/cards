import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui'
import { useGetMeQuery } from '@/services/auth'

export const Layout = () => {
  const { data: user } = useGetMeQuery()

  return (
    <div>
      <Header
        name={user?.name}
        avatar={user?.avatar}
        email={user?.email}
        isAuth={!!user.id}
        onSignIn={() => {}}
      />
      <Outlet />
    </div>
  )
}
