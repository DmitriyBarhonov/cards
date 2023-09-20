import { createSlice } from '@reduxjs/toolkit'

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
    currentPage: 1,
  },
  reducers: {
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})
