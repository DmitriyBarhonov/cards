import { createSlice, PayloadAction } from '@reduxjs/toolkit'
const initialState = {
  currentPage: 1,
  itemsPerPage: '5',
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
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
