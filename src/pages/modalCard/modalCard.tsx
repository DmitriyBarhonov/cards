import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { EdittextIcon } from '@/assets/icons/editText.tsx'
import { Button, Modal, Typography } from '@/components/ui'

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
        modalButtonTitle={'whoawhoa'}
        onOpenChange={() => {}}
      >
        <div className={'flex items-center justify-between'}>
          <Button style={{ background: 'red' }} onClick={closeModalHandler} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'}>Create</Button>
        </div>
      </Modal>
    </div>
  )
}
