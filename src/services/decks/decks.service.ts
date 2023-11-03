import { baseApi } from '@/services/base-api.ts'
import { Card, GetRandomCard, SaveTheGrade } from '@/services/cards/cards.types.ts'
import {
  Deck,
  DeckResponseType,
  DecksParams,
  DeckRequestParams,
} from '@/services/decks/decks.types.ts'
import { RootState } from '@/services/store.ts'

const deskApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DeckResponseType, DecksParams>({
        query: (params: DecksParams) => ({
          url: `v1/decks`,
          method: 'GET',
          params: params ?? {},
        }),
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Deck, DeckRequestParams>({
        query: data => ({
          url: `v1/decks`,
          method: 'POST',
          body: data,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          try {
            const response = await queryFulfilled

            dispatch(
              deskApi.util.updateQueryData(
                'getDecks',
                { currentPage: state.decks.currentPage },
                draft => {
                  draft.items.push(response.data)
                }
              )
            )
          } catch (error) {
            alert(error)
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getDeckById: builder.query<Deck, { id: string }>({
        query: ({ id }) => `/v1/decks/${id}`,
        // providesTags: ['Cards'],
      }),
      updateDeck: builder.mutation<Deck, { id: string; data: DeckRequestParams }>({
        query: updateData => ({
          url: `/v1/decks/${updateData.id}`,
          method: 'PATCH',
          body: updateData.data,
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          try {
            const response = await queryFulfilled

            dispatch(
              deskApi.util.updateQueryData(
                'getDecks',
                { currentPage: state.decks.currentPage },
                draft => {
                  draft.items = draft.items.map(item => (item.id === id ? item : response.data))
                }
              )
            )
          } catch {
            // patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<void, { id: string }>({
        query: data => ({
          url: `v1/decks/${data.id}`,
          method: 'DELETE',
        }),
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          const patchResult = dispatch(
            deskApi.util.updateQueryData(
              'getDecks',
              { currentPage: state.decks.currentPage },

              draft => {
                draft.items = draft.items.filter(item => item.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      getARandomCard: builder.query<Card, GetRandomCard>({
        query: ({ id, ...args }) => ({
          url: `/v1/decks/${id}/learn`,
          method: 'GET',
          params: { ...args },
        }),
        providesTags: ['Learn'],
      }),
      saveTheGrade: builder.mutation<Card, { deckId: string; data: SaveTheGrade }>({
        query: ({ deckId, data }) => ({
          url: `v1/decks/${deckId}/learn`,
          method: 'POST',
          body: {
            cardId: data.cardId,
            grade: data.grade,
          },
        }),
        invalidatesTags: ['Learn'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useDeleteDeckMutation,
  useCreateDeckMutation,
  useUpdateDeckMutation,
  useGetDeckByIdQuery,
  useGetARandomCardQuery,
  useSaveTheGradeMutation,
} = deskApi
