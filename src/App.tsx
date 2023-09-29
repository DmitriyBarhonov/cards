import { Provider } from 'react-redux'

// import { Router } from '@/router.tsx'
import { DropdownMenuDemo } from './components/ui/dropdown-menu'
import { DropdownItem } from './components/ui/dropdown-menu/custom-drop-down/drop-down-item'
// import { Router } from '@/router.tsx'

import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <DropdownMenuDemo>
        <DropdownItem icon={'dwdw'} onClick={() => {}} text="dd1" />
        <DropdownItem icon={'dwdw'} onClick={() => {}} text="2" />
        <DropdownItem icon={'dwdw'} onClick={() => {}} text="d3" />
      </DropdownMenuDemo>
    </Provider>
  )
}
