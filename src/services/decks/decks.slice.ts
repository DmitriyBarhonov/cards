import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InitialStateType } from './decks.types'

const initialState: InitialStateType = {
  currentPage: 1,
  itemsPerPage: '10',
  tabValue: 'all',
  cardsCount: {
    minCardsCount: 0,
    maxCardsCount: 50,
  },
}

export const decksSlice = createSlice({
  name: 'decks',
  initialState: initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updateItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
    setMinMaxcardsCount: (state, action: PayloadAction<number[]>) => {
      state.cardsCount.minCardsCount = action.payload[0]
      state.cardsCount.maxCardsCount = action.payload[1]
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.cardsCount.maxCardsCount = action.payload
    },
    setTabValue: (state, action: PayloadAction<string>) => {
      state.tabValue = action.payload
    },
  },
})

export const {
  setMinMaxcardsCount,
  updateCurrentPage,
  updateItemsPerPage,
  setTabValue,
  setMaxCardsCount,
} = decksSlice.actions
