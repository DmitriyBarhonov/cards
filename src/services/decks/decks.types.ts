export type Pagination = {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: string | null
  rating: number
  isDeleted?: boolean | null
  isBlocked?: boolean | null
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type DeckResponseType = {
  maxCardsCount: number
  pagination: Pagination
  items: Deck[]
}

export type DecksParams = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string | null
  currentPage?: number
  itemsPerPage?: number
} | void

export type DeckRequestParams = {
  cover?: File // Поле cover ожидает файл (binary)
  name?: string
  isPrivate?: boolean
  id?: string
}

export type GetCardsDeckParams = {
  id: string
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

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
