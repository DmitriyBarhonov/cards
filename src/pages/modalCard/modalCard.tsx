import { useState } from 'react'

import { EdittextIcon } from '@/assets/icons/editText.tsx'
import { Button, Input, Modal, Typography } from '@/components/ui'

export const ModalCard = () => {
  let [openModal, setOpenModal] = useState(false)

  const openModalHandler = () => {
    setOpenModal(true)
  }
  const closeModalHandler = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <Button onClick={openModalHandler}>{'RATATAT'}</Button>
      <Typography onClick={openModalHandler}>{'asadada'}</Typography>
      <EdittextIcon onClick={openModalHandler} />

      <Modal
        onClose={() => {
          setOpenModal(false)
        }}
        modalMainTitle={'Set new card name'}
        modalTitleVariant={'large'}
        open={openModal}
        onOpenChange={() => {}}
      >
        <div className={'center'}>
          <Input className={'fWidth'} label={'Hello there'}></Input>
        </div>
        <div className={'flex justify-between mt-5 mb-3'}>
          <Button onClick={closeModalHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'}>Create</Button>
        </div>
      </Modal>
    </div>
  )
}
