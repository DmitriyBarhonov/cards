import {
  createBrowserRouter,
  Outlet,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { ModalCard } from './pages/modalCard'

import { CheckEmail } from '@/components/auth/check-email'
import { ForgotPass } from '@/components/auth/forgot-pass'
import { PersonalInfo } from '@/components/auth/personal-info'
import { SetNewPass } from '@/components/auth/set-new-pass'
import { Typography } from '@/components/ui'
import { PageNotFound, Layout } from '@/pages'
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
  {
    path: '/*',
    element: <PageNotFound />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/personal-info', //todo не забыть повесить логику на id пользователя
    element: <PersonalInfo />,
  },
  {
    path: '/card',
    element: <ModalCard />,
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
    ],
  },
  {
    element: <Layout />,
    children: publicRoutes,
  },
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
