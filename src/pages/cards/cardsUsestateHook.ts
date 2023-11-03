import { useState } from 'react'

import { Card } from '@/services/cards/cards.types'
import { Sort } from '@/services/types'

export const useStateCard = () => {
  const [search, setSearch] = useState('') //для поиска по карточкамив колоде
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const [selectedCard, setSelectedCard] = useState<Card>({} as Card) //для удаления или редактирования нужной карточки
  const [addNewCardModal, setAddNewCardModal] = useState(false)
  const [updateCardModal, setUpdateCardModal] = useState(false)
  const [deleteCardModal, setDeleteCardModal] = useState(false)

  return {
    selectedCard,
    setSelectedCard,
    addNewCardModal,
    setAddNewCardModal,
    updateCardModal,
    setUpdateCardModal,
    deleteCardModal,
    setDeleteCardModal,
    search,
    setSearch,
    sort,
    setSort,
  }
}
