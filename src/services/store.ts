import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from './base-api'
import { cardsApi } from './cards'

import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksSlice.name]: decksSlice.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
