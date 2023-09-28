import { Provider } from 'react-redux'

// import { Router } from '@/router.tsx'
import { DropdownMenuDemo } from './components/ui/dropdown-menu'

import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <DropdownMenuDemo />
      {/*<div>Hello World</div>*/}
    </Provider>
  )
}
