import { baseApi } from '@/services/base-api.ts'
import { UpdateCardParams } from '@/services/cards/cards.types.ts'
import { Card, CardsResponse, GetCardsDeckParams } from '@/services/decks/decks.types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getACardsDeck: builder.query<CardsResponse, GetCardsDeckParams>({
        query: params => ({
          url: `/v1/decks/${params.id}/cards`,
          method: 'GET',
          params: {
            question: params.question,
            answer: params.answer,
            orderBy: params.orderBy,
            currentPage: params.currentPage,
            itemsPerPage: params.itemsPerPage,
          },
          providesTag: ['Cards'],
        }),
      }),
      getCardById: builder.query<Card, { id: string }>({
        query: ({ id }) => `/v1/cards/${id}`,
      }),
      updateCard: builder.mutation<Card, { id: string; data: UpdateCardParams }>({
        query: ({ id, data }) => ({
          url: `/v1/cards/${id}`,
          method: 'PATCH',
          body: {
            questionImg: data.questionImg,
            answerImg: data.answerImg,
            question: data.question,
            answer: data.answer,
            questionVideo: data.questionVideo,
            answerVideo: data.answerVideo,
          },
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
  useGetACardsDeckQuery,
  useUpdateCardMutation,
  useGetCardByIdQuery,
} = cardsApi
