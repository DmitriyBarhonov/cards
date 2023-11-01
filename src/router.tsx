import LinearProgress from '@mui/material/LinearProgress'
import {
  createBrowserRouter,
  Outlet,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { LearnPackPage } from './pages/learn-pack-page/learn-pack-page'
import { ModalCard } from './pages/modalCard'

import { CheckEmail } from '@/components/auth/check-email'
import { ForgotPass } from '@/components/auth/forgot-pass'
import { PersonalInfo } from '@/components/auth/personal-info'
import { SetNewPass } from '@/components/auth/set-new-pass'
import { PageNotFound, Layout, CardsPage } from '@/pages'
import { Decks } from '@/pages/decks/decks'
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
    path: '/cards/:id', //в компонент карточки зайдем только по айди колоды
    element: <CardsPage />,
  },
  {
    path: '/personal-info',
    element: <PersonalInfo />,
  },
  {
    path: '/card',
    element: <ModalCard />,
  },
  {
    path: '/learn/:deckId',
    element: <LearnPackPage />,
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

  if (isMeLoading) return <LinearProgress color="secondary" />

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()
  const isAuthenticated = me && me?.success !== false

  if (isMeLoading) return <LinearProgress color="secondary" />

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
