import { baseApi } from '@/services/base-api.ts'
import {
  Card,
  CardsResponse,
  GetCardsDeckParams,
  UpdateCardParams,
} from '@/services/cards/cards.types.ts'

export const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCardsDeck: builder.query<CardsResponse, GetCardsDeckParams>({
        query: ({ id, ...params }) => ({
          url: `/v1/decks/${id}/cards`,
          params: params,
        }),
        providesTags: ['Cards'],
      }),
      getCardById: builder.query<Card, { id: string }>({
        query: ({ id }) => `/v1/cards/${id}`,
      }),
      createCard: builder.mutation<Card, { id: string; data: UpdateCardParams }>({
        query: ({ id, data }) => ({
          url: `/v1/decks/${id}/cards`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<Card, { id: string; data: UpdateCardParams }>({
        query: ({ id, data }) => ({
          url: `/v1/cards/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, { id: string }>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useDeleteCardMutation,
  useGetCardsDeckQuery,
  useUpdateCardMutation,
  useCreateCardMutation,
} = cardsApi
