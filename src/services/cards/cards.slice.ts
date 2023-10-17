import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
    itemsPerPage: '10',
  },
  reducers: {
    //этот слайс нужен нам для того чтобы у ртк был доступ к данным о странице
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    updateItemsPerPage: (state, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload
    },
  },
})
