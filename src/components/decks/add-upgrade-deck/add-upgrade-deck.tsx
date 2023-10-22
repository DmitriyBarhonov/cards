import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Modal } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/controlled'
import { ControlledInput } from '@/components/ui/controlled-input'

const schema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('Enter deck name')
    .min(3, 'Deck name must be at least 4 symbols')
    .max(30, 'Deck name must be less than 30 symbols'),
  isPrivate: z.boolean().optional(), //если не будет optional, то всегда надо нажимать галочку, а это не надо
})
//колода будет не пустой строкой от 3 до 30 символов
//private будет опциональным булевым

export type AddUpgradeType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type AddUpgradeDeckProps = {
  defaultValues?: AddUpgradeType //используем при вызове для upgrade
  title: string //заголовок
  buttonText: string //текст на кнопке
  isOpen: boolean //открыта или закрыта
  toggleModal: (isOpen: boolean) => void //переключалка открытия или закрытия
  deckHandler: (data: AddUpgradeType) => void //при сабмите отправляем данные типа название колоды и приватная ли
  //если createDeck, то передаем просто функцию,
  //если upgrade, то на месте вызова компоненты передаем еще и id колоды
}
export const AddUpgradeDeck: FC<AddUpgradeDeckProps> = ({
  defaultValues = { name: '', isPrivate: false },
  title,
  buttonText,
  deckHandler,
  isOpen,
  toggleModal,
}) => {
  const { handleSubmit, control, reset, resetField } = useForm<AddUpgradeType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues, //берем из пропсов, по умолчанию пустые
  })
  ///
  const onSubmit = (data: AddUpgradeType) => {
    deckHandler(data)
    resetField('name')
    toggleModal(false)
  }

  let handleFormSubmitted = handleSubmit(onSubmit)
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
          name="name"
          variant={'standard'}
          placeholder={defaultValues.name}
          label={'New pack name'}
          control={control}
          autoComplete="false"
        />
        <div className={'my-8'}>
          <ControlledCheckbox name="isPrivate" label={'Private pack'} control={control} />
        </div>

        <div className={'flex justify-between'}>
          <Button type="button" onClick={onCloseHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button type="submit">{buttonText}</Button>
        </div>
      </form>
    </Modal>
  )
}
