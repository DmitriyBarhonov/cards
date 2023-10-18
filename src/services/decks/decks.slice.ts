import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
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
    //этот слайс нужен нам для того чтобы у ртк был доступ к данным о странице
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
    setTabValue: (state, action: PayloadAction<string>) => {
      state.tabValue = action.payload
    },
  },
})

export const { setMinMaxcardsCount, updateCurrentPage, updateItemsPerPage, setTabValue } =
  decksSlice.actions
