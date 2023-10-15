import { FC } from 'react'

import s from './delete-deck.module.scss'

import { Button, Modal, Typography } from '@/components/ui'

export type DeleteDeckProps = {
  isOpen: boolean
  toggleModal: (isOpen: boolean) => void
  id: string
  name: string
  deleteDeck: (data: { id: string }) => void
  //берем не всю колоду, нам нужно только id для удаления и имя колоды для текста
}
export const DeleteDeck: FC<DeleteDeckProps> = ({ id, name, isOpen, toggleModal, deleteDeck }) => {
  const onSubmit = () => {
    deleteDeck({ id })
    toggleModal(false)
  }
  const onOpenHandler = (isOpen: boolean) => {
    toggleModal(isOpen)
  }
  const onCloseHandler = () => {
    toggleModal(false)
  }

  return (
    <Modal
      onClose={onCloseHandler}
      open={isOpen}
      onOpenChange={onOpenHandler}
      modalMainTitle={'Delete Pack'}
    >
      <div className={s.text}>
        <Typography variant={'body1'}>
          Do you really want to remove
          <Typography variant={'subtitle1'} as={'span'}>
            {name}?
          </Typography>
        </Typography>

        <Typography>All cards will be deleted.</Typography>
        <div className={s.buttons}>
          <Button onClick={onCloseHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>Delete Pack</Button>
        </div>
      </div>
    </Modal>
  )
}
