import { Provider } from 'react-redux'

import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      {/*<div>Hello World</div>*/}
    </Provider>
  )
}
