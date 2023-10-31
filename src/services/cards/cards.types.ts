import { Pagination } from '@/services/decks/decks.types.ts'

export type UpdateCardParams = FormData

//old version
// export type UpdateCardParams = {
//   questionImg?: string
//   answerImg?: string
//   question?: string
//   answer?: string
//   questionVideo?: string
//   answerVideo?: string
// }

// Cards type
export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg: string | null
  answerImg: string | null
  questionVideo: string | null
  answerVideo: string | null
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}

export type CardsResponse = {
  pagination: Pagination
  items: Card[]
}

export type InitialStateType = {
  currentPage: number
  itemsPerPage: string
  tabValue: string
  cardsCount: {
    minCardsCount: number
    maxCardsCount: number
  }
}
export type CreateCardParams = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type GetRandomCard = {
  id: string
  previousCardId?: string
}
export type SaveTheGrade = {
  cardId: string
  grade: number
}

export type GetCardsDeckParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
}
