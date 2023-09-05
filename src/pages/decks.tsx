import { Button } from '@/components/ui'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { Deck } from '@/services/decks/types.ts'

export const Decks = () => {
  const decks = useGetDecksQuery()
  const [createDeck, {}] = useCreateDeckMutation()

  console.log(decks)
  if (decks.isError) return <div>decks.isError</div>

  return (
    <div>
      <Button
        onClick={() => {
          createDeck({ name: '321312' })
        }}
      >
        create Deck
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
