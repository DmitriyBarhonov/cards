import { Provider } from 'react-redux'

import { LogOut } from './assets/icons/logOut'
import { PersonOutline } from './assets/icons/person-outline'
import { Avatar, Button } from './components/ui'
// import { Router } from '@/router.tsx'
import { DropdownMenuDemo } from './components/ui/dropdown-menu'
import { DropdownItemUserInfo } from './components/ui/dropdown-menu/custom-drop-down/drop-down-user-info'
import { DropdownItem } from './components/ui/dropdown-menu/custom-drop-down/universal-drop-down-item'

// import { Router } from '@/router.tsx'

import { store } from '@/services/store.ts'

export function App() {
  return (
    <Provider store={store}>
      <DropdownMenuDemo>
        <DropdownItemUserInfo
          email="Death@hell.com"
          name="Death"
          elment={
            <Avatar
              avatar="https://tlgrm.ru/_/stickers/571/804/5718043a-b4ab-3949-acec-67958d778868/1.webp"
              name="Dimon"
            />
          }
        />
        <DropdownItem
          border={true}
          elment={<Button as="a">My Profile</Button>}
          icon={<PersonOutline />}
        />
        <DropdownItem border={true} elment={<Button as="a">Sign Out</Button>} icon={<LogOut />} />
      </DropdownMenuDemo>
    </Provider>
  )
}
// const App = () => {
//   render (
//     <>
//       <DropdownMenu>
//         <DropdownItem icon={} text="remove" onSelect={() => {}} />
//         {/* Внутри будет   <DropdownMenu.Item className={s.DropdownMenuItem}>New Window</DropdownMenu.Item> */}
//       </DropdownMenu>
//     </>
//   )
// }
