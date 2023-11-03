import { LinearProgress } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { LearnPack } from '@/components/learn-pack/learn-pack'
import { OptionType } from '@/components/ui'
import {
  useGetARandomCardQuery,
  useGetDeckByIdQuery,
  useSaveTheGradeMutation,
} from '@/services/decks'

const options: OptionType[] = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

export const LearnPackPage: React.FC = () => {
  const { deckId } = useParams() as {
    deckId: string
  }
  const { data: dataCard } = useGetARandomCardQuery({ id: deckId })
  const [saveTheGrade, result] = useSaveTheGradeMutation()
  const { data: deck } = useGetDeckByIdQuery({ id: deckId })

  const onSubmit: SubmitHandler<{ grade: string }> = ({ grade }) => {
    console.log(grade)

    const gradeCard = +grade

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
