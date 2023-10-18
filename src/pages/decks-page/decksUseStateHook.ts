import { useState } from 'react'

import { Deck } from '@/services/decks/decks.types'
import { Sort } from '@/services/types'

export const useStateDecks = () => {
  const [selectedDeck, setSelectedDeck] = useState<Deck>({} as Deck) //для удаления нужной колоды
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)
  const [addNewDeckModal, setAddNewDeckModal] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteDeckModal, setDeleteDeckModal] = useState(false)
  const [cardsCount, setCardsCount] = useState<number[]>([0, 25])

  return {
    selectedDeck,
    setSelectedDeck,
    sort,
    setSort,
    timerId,
    setTimerId,
    addNewDeckModal,
    setAddNewDeckModal,
    search,
    setSearch,
    deleteDeckModal,
    setDeleteDeckModal,
    cardsCount,
    setCardsCount,
  }
}
