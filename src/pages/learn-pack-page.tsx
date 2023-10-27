import { LinearProgress } from '@mui/material'
import { SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { LearnPack } from '@/components/learn-pack/learn-pack'
import { useGetARandomCardQuery, useSaveTheGradeMutation } from '@/services/decks'

export const LearnPackPage = () => {
  const { deckId } = useParams<{ deckId: string }>()
  const { data: dataCard } = useGetARandomCardQuery({ id: deckId ?? '' })
  const [saveTheGrade, result] = useSaveTheGradeMutation()

  const onSubmit: SubmitHandler<{ grade: string }> = data => {
    let gradeCard = +data.grade

    if (deckId) {
      saveTheGrade({ deckId, data: { cardId: dataCard?.id ?? '', grade: gradeCard } })
    }
  }

  return (
    <>
      {result.isLoading && <LinearProgress />}
      <LearnPack data={dataCard} onSubmit={onSubmit} />
    </>
  )
}
