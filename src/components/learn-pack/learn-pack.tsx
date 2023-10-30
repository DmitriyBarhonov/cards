import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { Button, Card, OptionType, Typography } from '../ui'
import { ControlledRadioGroup } from '../ui/controlled'

import { Card as CardType } from '@/services/decks/decks.types'

type LearnPackProps = {
  dataCard?: CardType
  onSubmit: any
  options: OptionType[]
  nameDeck: string
}

export const LearnPack: React.FC<LearnPackProps> = ({ dataCard, onSubmit, options, nameDeck }) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const { handleSubmit, control } = useForm<{ grade: string }>({
    mode: 'onSubmit',
    defaultValues: {
      grade: '1',
    },
  })
  const showAnswerHandler = () => {
    setShowAnswer(true)
  }

  const saveGradeHandler = () => {
    setShowAnswer(false)
  }

  console.log(location)

  return (
    <>
      <Card style={{ width: '500px', margin: '110px auto', textAlign: 'center' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Typography variant="h1">{`Learn ${nameDeck}`}</Typography>
            <Typography>{`Question: ${dataCard ? dataCard.question : ''}`}?</Typography>
          </div>
          {!showAnswer || (
            <div>
              {dataCard?.questionImg ? <img src={dataCard?.questionImg} alt={nameDeck} /> : null}
              <ControlledRadioGroup options={options} control={control} name="grade" />
            </div>
          )}
          {!showAnswer ? (
            <Button type="submit" onClick={showAnswerHandler}>
              Show Answer
            </Button>
          ) : (
            <Button type="button" onClick={saveGradeHandler}>
              Next Question
            </Button>
          )}
        </form>
      </Card>
    </>
  )
}
