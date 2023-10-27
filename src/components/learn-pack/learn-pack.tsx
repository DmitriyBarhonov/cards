import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '../ui'
import { ControlledRadioGroup } from '../ui/controlled'

const options = [
  { label: 'Did not know', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

export const LearnPack = (props: any) => {
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

  return (
    <>
      <Card style={{ width: '500px', margin: '110px auto', textAlign: 'center' }}>
        <form onSubmit={handleSubmit(props.onSubmit)}>
          <div>
            <Typography variant="h1">{`Learn ${props.data?.question}`}</Typography>
            <Typography>{`Question: ${props.data?.question}`}?</Typography>
          </div>
          {!showAnswer || (
            <div>
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
