import { LinearProgress } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { LearnPack } from '@/components/learn-pack/learn-pack'
import {
  useGetARandomCardQuery,
  useGetDeckByIdQuery,
  useSaveTheGradeMutation,
} from '@/services/decks'

const options = [
  { label: 'Did not know', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

export const LearnPackPage: React.FC = () => {
  const { deckId } = useParams() as {
    deckId: string
  }
  const { data: dataCard } = useGetARandomCardQuery({ id: deckId })
  const [saveTheGrade, result] = useSaveTheGradeMutation()
  const { data: deck } = useGetDeckByIdQuery({ id: deckId })
  const onSubmit: SubmitHandler<{ grade: string }> = data => {
    const gradeCard = +data.grade

    if (deckId && dataCard) {
      saveTheGrade({ deckId, data: { cardId: dataCard.id, grade: gradeCard } })
    }
  }

  return (
    <>
      {result.isLoading && <LinearProgress />}
      <LearnPack
        nameDeck={deck?.name || ''}
        options={options}
        dataCard={dataCard}
        onSubmit={onSubmit}
      />
    </>
  )
}
