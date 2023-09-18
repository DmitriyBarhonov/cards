import {
  createBrowserRouter,
  Outlet,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { CheckEmail } from '@/components/auth/check-email'
import { ForgotPass } from '@/components/auth/forgot-pass'
import { PersonalInfo } from '@/components/auth/personal-info'
import { SetNewPass } from '@/components/auth/set-new-pass'
import { Typography } from '@/components/ui'
import { Decks } from '@/pages/decks-page/decks.tsx'
import { SignInPage } from '@/pages/sign-in-page/sign-in-page.tsx'
import { SignUpPage } from '@/pages/sign-up-page/sign-up-page.tsx'
import { useGetMeQuery } from '@/services/auth'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPass onSubmit={() => {}} />,
  },
  {
    path: '/check-your-email',
    element: <CheckEmail />,
  },
  {
    path: '/set-new-password',
    element: <SetNewPass onSubmit={() => {}} />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/personal-info',
    element: <PersonalInfo />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  const { isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <Typography variant={'h1'}>Loading</Typography>

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()
  const isAuthenticated = me && me?.success !== false

  if (isMeLoading) return <Typography variant={'h1'}>Loading</Typography>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
