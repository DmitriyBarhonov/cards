import { baseApi } from '@/services/base-api.ts'
import {
  CardsResponse,
  Deck,
  DeckResponseType,
  DecksParams,
  DeckRequestParams,
  GetCardsDeckParams,
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
        //когда выполнится запрос и даные придут
        //они будут храниться в кэше под тегом Decks
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
        //сначала добавляем async onQueryStarted
        //тут все таки айди нужен
        async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
          const state = getState() as RootState

          const patchResult = dispatch(
            deskApi.util.updateQueryData(
              //тут будем давать адрес 1, 2 аргументы и 3 какое-то действие
              'getDecks',
              //мы же getDesks будем выполнять, вот и параметры для него тут
              { currentPage: state.decks.currentPage },

              draft => {
                //В предоставленном коде draft представляет собой неизменяемое (immutable)
                // состояние данных, которое может быть изменено с использованием библиотеки
                // В данном контексте, draft относится к состоянию кэша данных, которое можно
                // модифицировать перед обновлением. Это позволяет изменять данные кэша
                // без прямого мутирования (модификации) исходного состояния.
                // т.е. здесь драфт это вся фигня =D что есть в кэше д тегом 'Decks'
                draft.items = draft.items.filter(item => item.id !== id)
              }
            )
          )

          try {
            //итак, на этом моменты попытаемся осуществитьь вышеписанное
            await queryFulfilled
          } catch {
            //но, на случай если что-то пойдет не по плану
            //есть undo, которая откатит наши оптимистичные изменения (на жизненные ;D)
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<Deck, DeckRequestParams>({
        query: updateData => ({
          url: `/v1/decks/${updateData.id}`,
          method: 'PATCH',
          body: {
            cover: updateData.cover,
            name: updateData.name,
            isPrivate: updateData.isPrivate,
          },
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
      getDeckById: builder.query<Deck, { id: string }>({
        query: ({ id }) => `/v1/decks/${id}`,
      }),
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
        }),
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
  useGetACardsDeckQuery,
} = deskApi
