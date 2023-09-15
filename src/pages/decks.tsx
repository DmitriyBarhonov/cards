import { useState } from 'react'

import { Button } from '@/components/ui'
import { SliderForCards } from '@/components/ui/slider'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { Deck } from '@/services/decks/types.ts'

export const Decks = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const decks = useGetDecksQuery({
    itemsPerPage,
  })
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  if (decks.isError) return <div>decks.isError</div>

  return (
    <div>
      {/*таб свтчер времено размещен для испытаний*/}
      <div>
        <SliderForCards disabled={false} />
      </div>
      <Button
        onClick={() => {
          createDeck({ name: '321312' })
        }}
      >
        create Deck
      </Button>
      <Button
        onClick={() => {
          setItemsPerPage(20)
        }}
        disabled={isLoading}
      >
        set 20 items
      </Button>
      <Button
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
          </tr>
        </thead>
        <tbody>
          {decks.data?.items?.map((deck: Deck) => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{deck.updated}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
