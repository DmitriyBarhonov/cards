import { FC } from 'react'

import s from './delete-deck.module.scss'

import { Button, Modal, Typography } from '@/components/ui'

export type DeleteItemProps = {
  title: string
  text: string
  buttonText: string
  isOpen: boolean
  toggleModal: (isOpen: boolean) => void
  id: string
  name: string
  deleteItem: (data: { id: string }) => void
  //берем не всю колоду, нам нужно только id для удаления и имя колоды для текста
}
export const DeleteItem: FC<DeleteItemProps> = ({
  title,
  text,
  buttonText,
  isOpen,
  toggleModal,
  id,
  name,
  deleteItem,
}) => {
  const onSubmit = () => {
    deleteItem({ id })
    toggleModal(false)
  }
  const onOpenHandler = (isOpen: boolean) => {
    toggleModal(isOpen)
  }
  const onCloseHandler = () => {
    document.body.classList.remove('pointer-events')
    toggleModal(false)
  }

  return (
    <Modal
      onClose={onCloseHandler}
      open={isOpen}
      onOpenChange={onOpenHandler}
      modalMainTitle={title}
    >
      <div className={s.text}>
        <Typography variant={'body1'}>
          Do you really want to remove
          <Typography variant={'subtitle1'} as={'span'}>
            {' '}
            {name}?
          </Typography>
        </Typography>

        <Typography>{text}</Typography>
        <div className={s.buttons}>
          <Button onClick={onCloseHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{buttonText}</Button>
        </div>
      </div>
    </Modal>
  )
}
