import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/services/base-query-with-reauth.ts'

export const baseApi = createApi({
  //createApi создает нам умный редюсер, который по мотом интегрим в стор
  //и через который мы в последствии будем деать запросы.
  //еще этот редюсер будет нам возвращать хуки,
  //через хуки мы будем получать данные асинхронно

  //название и путь где будет храниться наш редюсер
  reducerPath: 'baseApi',
  //
  tagTypes: ['Decks', 'Me', 'Cards'],

  //позволяет нам создать некий базовый инстанс
  //тоесть для каждого запроса будет создаваться некая основа

  //тут вместо fetchBaseQuery мы подключим baseQueryWithReauth
  // тоеть готовый код для реавторизации с сайта ртк
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
