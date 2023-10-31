import { useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { Button, Card, OptionType, Typography } from '../ui'
import { ControlledRadioGroup } from '../ui/controlled'

import s from './learn-pack.module.scss'

import { Card as CardType } from '@/services/decks/decks.types'

type LearnPackProps = {
  dataCard?: CardType
  onSubmit: (data: { grade: string }) => void
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
    setShowAnswer(() => !showAnswer)
  }

  return (
    <Card className={s.cards}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography className={s.learnTitle} variant="h1">{`Learn ${nameDeck}`}</Typography>
          <Typography className={s.questionTitle}>
            <span>Question:</span> {` ${dataCard ? dataCard.question : ''}`}?
          </Typography>
          {dataCard?.questionImg ? <img src={dataCard?.questionImg} alt={nameDeck} /> : null}
          <Typography
            className={s.answersCount}
          >{`Number of answers per question: ${dataCard?.shots}`}</Typography>
        </div>
        {!showAnswer || (
          <div className={s.answerList}>
            <span>Answer:</span>
            {dataCard?.answerImg ? <img src={dataCard?.answerImg} alt={nameDeck} /> : null}
            <div className={s.rate}>
              <span>Rate yourself:</span>
              <div className={s.radioGroup}>
                <ControlledRadioGroup options={options} control={control} name="grade" />
              </div>
            </div>
          </div>
        )}
        {!showAnswer ? (
          <Button type="submit" onClick={showAnswerHandler}>
            Show Answer
          </Button>
        ) : (
          <Button className={s.nextButton} type="button" onClick={showAnswerHandler}>
            Next Question
          </Button>
        )}
      </form>
    </Card>
  )
}
