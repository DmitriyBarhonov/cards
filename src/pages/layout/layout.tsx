import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui'
import { useGetMeQuery } from '@/services/auth'

export const Layout = () => {
  //даные о ползователе поулчаем из запроса
  const { data: user } = useGetMeQuery()

  return (
    <div>
      <Header
        name={user?.name}
        avatar={user?.avatar}
        email={user?.email}
        isAuth={true}
        onSignIn={() => {}}
      />
      <Outlet />
    </div>
  )
} //все просто, отрисуй всех детей с хэдэром сверху
