import { Button } from '@/components/ui'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'

export const Decks = () => {
  const decks = useGetDecksQuery()
  const [createDeck, {}] = useCreateDeckMutation()

  console.log(decks)
  if (decks.isError) return <div>decks.isError</div>

  return (
    <div>
      <Button
        onClick={() => {
          createDeck({ name: '1234' })
        }}
      >
        create Deck
      </Button>
    </div>
  )
}
