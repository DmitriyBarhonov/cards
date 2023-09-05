import { baseApi } from '@/services/base-api.ts'

const deskApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<any, void>({
        query: () => `v1/decks`,
      }),
      createDeck: builder.mutation<any, { name: string }>({
        query: ({ name }) => ({
          url: `v1/decks`,
          method: 'POST',
          body: { name },
        }),
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = deskApi
