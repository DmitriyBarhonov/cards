import { baseApi } from '@/services/base-api.ts'
import { UpdateCardParams } from '@/services/cards/cards.types.ts'
import { Card } from '@/services/decks/decks.types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
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

export const { useDeleteCardMutation, useUpdateCardMutation, useGetCardByIdQuery } = cardsApi
