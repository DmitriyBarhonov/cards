import { baseApi } from '@/services/base-api.ts'
import { Deck, DeckResponseType, DecksParams } from '@/services/decks/deck.types.ts'

const deskApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DeckResponseType, DecksParams>({
        query: (params: DecksParams) => ({
          url: `v1/decks`,
          method: 'GET',
          params: params ?? {},
        }),
        //когда выполнится запрос и даные придут
        //они будут храниться в кэше под тегом Decks
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, { name: string }>({
        query: ({ name }) => ({
          url: `v1/decks`,
          method: 'POST',
          body: { name },
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const response = await queryFulfilled

            dispatch(
              deskApi.util.updateQueryData('getDecks', { authorId: '1', currentPage: 1 }, draft => {
                draft.items.unshift(response.data)
              })
            )
          } catch (error) {
            console.log(error)
          }
        },
        //когда выполнится запрос и даные придут
        //сд. прошлые данные с этим тегом невалидными
        //и так сдулается обновление
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        //   const patchResult = dispatch(
        //     deskApi.util.updateQueryData('getDecks', {}, draft => {
        //       Object.assign(draft, patch)
        //     })
        //   )
        //
        //   try {
        //     await queryFulfilled
        //   } catch {
        //     patchResult.undo()
        //
        //     /**
        //      * Alternatively, on failure you can invalidate the corresponding cache tags
        //      * to trigger a re-fetch:
        //      * dispatch(api.util.invalidateTags(['Post']))
        //      */
        //   }
        // },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useDeleteDeckMutation, useCreateDeckMutation } = deskApi
