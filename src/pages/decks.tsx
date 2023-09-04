import { useGetDecksQuery } from '@/services/base-api.ts'

export const Decks = () => {
  const { isLoading, data } = useGetDecksQuery()

  if (isLoading) return <h1>Loading...</h1>

  return <div>Decks</div>
}
