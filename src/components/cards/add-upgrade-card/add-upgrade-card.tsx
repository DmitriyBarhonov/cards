import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Modal } from '@/components/ui'
import { ControlledInput } from '@/components/ui/controlled-input'

const schema = z.object({
  question: z
    .string()
    .trim()
    .nonempty('Enter card question')
    .min(4, 'Card question must be at least 4 symbols')
    .max(500, 'Card question must be less than 500 symbols'),
  answer: z
    .string()
    .trim()
    .nonempty('Enter card question')
    .min(4, 'Card question must be at least 4 symbols')
    .max(500, 'Card question must be less than 500 symbols'),
})
//card будет не пустой строкой от 3 до 500 символов

export type FormValuesType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type AddUpgradeCardProps = {
  defaultValues?: FormValuesType //используем при вызове для upgrade
  title: string //заголовок
  buttonText: string //текст на кнопке
  isOpen: boolean //открыта или закрыта
  toggleModal: (isOpen: boolean) => void //переключалка открытия или закрытия
  cardHandler: (data: FormValuesType) => void //при сабмите отправляем данные типа вопрос и ответ
  //если createDeck, то передаем просто функцию,
  //если upgrade, то на месте вызова компоненты передаем еще и id колоды
}
export const AddUpgradeCard: FC<AddUpgradeCardProps> = ({
  defaultValues = { question: '', answer: '' },
  title,
  buttonText,
  cardHandler,
  isOpen,
  toggleModal,
}) => {
  const { handleSubmit, control, reset } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues, //берем из пропсов, по умолчанию пустые
  })
  ///
  const onSubmit = (data: FormValuesType) => {
    cardHandler(data)
    reset()
    toggleModal(false)
    //при сабмите фызвать функцию, сбросить значения и закрыться
  }

  const handleFormSubmitted = handleSubmit(onSubmit)
  const onOpenHandler = (isOpen: boolean) => {
    toggleModal(isOpen)
  }
  const onCloseHandler = () => {
    reset()
    toggleModal(false)
  }

  return (
    <Modal
      onClose={onCloseHandler}
      open={isOpen}
      onOpenChange={onOpenHandler}
      modalMainTitle={title}
    >
      <form onSubmit={handleFormSubmitted}>
        <ControlledInput
          name="question"
          variant={'standard'}
          placeholder={defaultValues.question}
          label={'Question'}
          control={control}
          autoComplete="false"
        />
        <ControlledInput
          name="answer"
          variant={'standard'}
          placeholder={defaultValues.answer}
          label={'Answer'}
          control={control}
          autoComplete="false"
        />
        <div className={'flex justify-between'}>
          <Button onClick={onCloseHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button type="submit">{buttonText}</Button>
        </div>
      </form>
    </Modal>
  )
}
