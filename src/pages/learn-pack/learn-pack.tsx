import { useParams } from 'react-router-dom'

import { useGetARandomCardQuery, useSaveTheGradeMutation } from '@/services/decks'

export const LearnPack = () => {
  const { id } = useParams<{ id: string }>()
  const [a] = useSaveTheGradeMutation()

  const { data: d } = useGetARandomCardQuery({ id: id ?? '' })

  const z = () => {
    a({ id: 'id', data: { cardId: 'clo7lnzqe17dhvo2qys4z0s7t', grade: 1 } })
  }

  return (
    <>
      <button onClick={z}></button>
      <div>{JSON.stringify(d)}</div>
    </>
  )
}

// Нажимаем learn to dekc
// запрос https://api.flashcards.andrii.es/v1/decks/{id}
//  https://api.flashcards.andrii.es/v1/decks/{id}/learn
// Нажимаем show ansver
// выпадает radio-group
// нажимаем next question
