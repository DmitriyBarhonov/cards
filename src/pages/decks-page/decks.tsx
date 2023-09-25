import { useState } from 'react'

import { Button } from '@/components/ui'
import { SliderForCards } from '@/components/ui/slider'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/decks/decks.types.ts'

export const Decks = () => {
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const dispatch = useAppDispatch()
  const updateCurrentPage = (page: number) => dispatch(decksSlice.actions.updateCurrentPage(page))
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
  })
  const [deleteDeck] = useDeleteDeckMutation()
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  //if (decks.isError) return <div>decks.isError</div>

  return (
    <div>
      {/* времено размещен для испытаний*/}
      <div style={{ margin: '20px' }}>
        <SliderForCards disabled={false} />
      </div>
      <Button
        style={{ marginLeft: '6px' }}
        onClick={() => {
          updateCurrentPage(1)
          createDeck({ name: '321312' })
        }}
      >
        create Deck
      </Button>
      <Button
        style={{ marginLeft: '6px' }}
        onClick={() => {
          setItemsPerPage(20)
        }}
        disabled={isLoading}
      >
        set 20 items
      </Button>
      <Button
        style={{ marginLeft: '6px' }}
        onClick={() => {
          setItemsPerPage(10)
        }}
        disabled={isLoading}
      >
        set 10 items
      </Button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Updated</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {decks?.items?.map((deck: Deck) => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{deck.updated}</td>
                <td>{deck.author.name}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteDeck({ id: deck.id })
                    }}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
        <Button
          style={{ marginTop: '20px', marginLeft: '6px' }}
          key={item}
          onClick={() => {
            updateCurrentPage(item)
          }}
        >
          {item}
        </Button>
      ))}
    </div>
  )
}
