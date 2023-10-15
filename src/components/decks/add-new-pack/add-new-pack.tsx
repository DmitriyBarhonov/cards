import { FC } from 'react'

//import { DevTool } from '@hookform/devtools'
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
//deck будет не пустой строкой от 3 до 30 символов
//private будет опциональным булевым

export type AddNewPackType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type AddNewPackProps = {
  isOpen: boolean
  toggleModal: (isOpen: boolean) => void
  addDeck: (data: AddNewPackType) => void //при сабмите отправляем данные типа название колоды и приватная ли
}
export const AddNewPack: FC<AddNewPackProps> = ({ addDeck, isOpen, toggleModal }) => {
  const { handleSubmit, control, reset, resetField } = useForm<AddNewPackType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  })
  ///
  const onSubmit = (data: AddNewPackType) => {
    addDeck(data)
    resetField('name')
    toggleModal(false)
  }

  const handleFormSubmitted = handleSubmit(onSubmit)

  const onCloseHandler = () => {
    reset()
    toggleModal(false)
  }

  return (
    <Modal
      onClose={onCloseHandler}
      open={isOpen}
      onOpenChange={() => resetField('name')}
      modalMainTitle={'Add New Pack'}
    >
      <form onSubmit={handleFormSubmitted}>
        {/*<DevTool control={control} />*/}
        <ControlledInput
          // className={'fWidth'}
          name="name"
          variant={'standard'}
          placeholder={'Name'}
          label={'New pack name'}
          control={control}
          autoComplete="false"
        />
        <div className={'my-8'}>
          <ControlledCheckbox name="isPrivate" label={'Private pack'} control={control} />
        </div>

        <div className={'flex justify-between'}>
          <Button onClick={onCloseHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button type="submit">Add Deck</Button>
        </div>
      </form>
    </Modal>
  )
}
