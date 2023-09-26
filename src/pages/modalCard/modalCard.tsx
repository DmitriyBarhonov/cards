import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { EdittextIcon } from '@/assets/icons/editText.tsx'
import { Button, Modal, Typography } from '@/components/ui'

export const ModalCard = () => {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <Modal
        modalMainTitle={'Set new card name'}
        modalTitleVariant={'large'}
        open={open}
        modalButtonTitle={'whoawhoa'}
        onOpenChange={() => {}}
      >
        <Dialog.Trigger>
          <EdittextIcon />
        </Dialog.Trigger>
      </Modal>
    </div>
  )
}
