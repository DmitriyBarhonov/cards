import { useGetDecksQuery } from '@/services/decks'

export const Decks = () => {
  const decks = useGetDecksQuery()

  console.log(decks)
  if (decks.isError) return <div>decks.isError</div>

  return <div>{JSON.stringify(decks || '')}</div>
}
