import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  // window.addEventListener('click', function (event) {
  //   // Получаем элемент, на котором произошел клик
  //   const targetElement = event.target

  //   // Выводим информацию о элементе в консоль
  //   console.log('Клик произошел на элементе:', targetElement)
  // })

  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  )
}
