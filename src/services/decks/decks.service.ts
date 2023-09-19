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
        query: currentData => ({
          url: `v1/decks/${currentData.id}`,
          method: 'DELETE',
        }),
        //сначала добавляем async onQueryStarted
        //тут все таки айди нужен
        async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            deskApi.util.updateQueryData(
              //тут будем давать адрес 1, 2 аргументы и 3 какое-то действие
              'getDecks',
              //мы же getDesks будем выполнять, вот и параметры для него тут
              { authorId: '1', currentPage: 1 },
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

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useDeleteDeckMutation, useCreateDeckMutation } = deskApi
