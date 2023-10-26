import { useState } from 'react'

import { Deck } from '@/services/decks/decks.types'
import { Sort } from '@/services/types'

export const useStateDecks = () => {
  const [selectedDeck, setSelectedDeck] = useState<Deck>({} as Deck) //для удаления нужной колоды
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const [addNewDeckModal, setAddNewDeckModal] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteDeckModal, setDeleteDeckModal] = useState(false)
  const [updateDeckModal, setUpdateDeckModal] = useState(false)

  return {
    selectedDeck,
    setSelectedDeck,
    sort,
    setSort,
    addNewDeckModal,
    setAddNewDeckModal,
    search,
    setSearch,
    deleteDeckModal,
    setDeleteDeckModal,
    updateDeckModal,
    setUpdateDeckModal,
  }
}
