import { Navigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign-in'
import { useGetMeQuery, useLoginMutation } from '@/services/auth'

export const SignInPage = () => {
  //тут нам надо залогиниться, что для этого сделать?
  //деструктуризацией достаем из хука логинизациифункции login
  // передаем его обязательному пропсу onSubmit
  //onSubmit под капотом передает данные формы нашему логину
  //и он уже в свою очередь отправид даные на сервер
  const [login] = useLoginMutation()

  //после успешной логинизации нам нужен редирект, но логин
  //возвращает нам только токен, но не инфу о том что авторизованны
  //для получения этих данных мы используем me запрос. Получаем
  //data, в которой вся необходимая инфа. Если data указывает что
  // мы залогинены, значит пользователя можно редиректнуть
  const { data: me } = useGetMeQuery()

  if (me && me?.success !== false) return <Navigate to={'/'} />

  return <SignIn onSubmit={login} />
}
