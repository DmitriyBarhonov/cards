import { baseApi } from '@/services/base-api.ts'

const deskApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<any, void>({
        query: () => `v1/decks`,
        //когда выполнится запрос и даные придут
        //они будут храниться в кэше под тегом Decks
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<any, { name: string }>({
        query: ({ name }) => ({
          url: `v1/decks`,
          method: 'POST',
          body: { name },
        }),
        //когда выполнится запрос и даные придут
        //сд. прошлые данные с этим тегом невалидными
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = deskApi
