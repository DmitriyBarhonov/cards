import { useEffect } from 'react'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  )
}
