import { Provider } from 'react-redux'

import { Header } from './components/ui'

import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      {/* <Router /> */}
      <Header
        isAuth={false}
        onSignIn={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    </Provider>
  )
}
