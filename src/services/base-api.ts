import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  //createApi создает нам умный редюсер, который по мотом интегрим в стор
  //и через который мы в последствии будем деать запросы.
  //еще этот редюсер будет нам возвращать хуки,
  //через хуки мы будем получать данные асинхронно

  //название и путь где будет храниться наш редюсер
  reducerPath: 'baseApi',
  //
  tagTypes: ['Decks', 'Me'],

  //позволяет нам создать некий базовый инстанс
  //тоесть для каждого запроса будет создаваться некая основа
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
  }),
  endpoints: () => ({}),
})
