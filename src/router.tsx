import LinearProgress from '@mui/material/LinearProgress'
import {
  createBrowserRouter,
  Outlet,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { CheckEmail, PersonalInfo, SetNewPass } from '@/components/auth'
import {
  PageNotFound,
  Layout,
  CardsPage,
  Decks,
  SignUpPage,
  SignInPage,
  LearnPackPage,
  ForgotPasswordPage,
} from '@/pages'
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
    element: <ForgotPasswordPage />,
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
    path: '/cards/:id',
    element: <CardsPage />,
  },
  {
    path: '/personal-info',
    element: <PersonalInfo />,
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
