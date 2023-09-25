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
import { SignIn } from '@/components/auth/sign-in'
import { SignUp } from '@/components/auth/sign-up'
import { PageNotFound } from '@/pages'
import { Decks } from '@/pages/decks.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignIn onSubmit={() => {}} />,
  },
  {
    path: '/sign-up',
    element: <SignUp onSubmit={() => {}} />,
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
    path: '/personal-info',
    element: <PersonalInfo />,
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
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
