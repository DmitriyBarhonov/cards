import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './modal.module.scss'

import { Typography } from '@/components/ui'

type ModalProps = {
  open?: boolean
  trigger: ReactNode
  onOpenChange: (open: boolean) => void
  children: ReactNode
  onClose?: () => void
  hideCloseIcon?: boolean
  modalMainTitle?: string
  modalTitleVariant?: 'default' | 'large'
}
export const Modal: FC<ModalProps> = ({
  onClose,
  trigger,
  open,
  modalMainTitle,
  children,
  ...restProps
}) => {
  const typographyVariant = restProps.modalTitleVariant === 'default' ? 'h1' : 'large'

  const classNames = {
    overlay: clsx(s.dialogOverlay),
    content: clsx(s.dialogContent),
    //если будет нужен большой тайтл, добавим доп.класс
    title: clsx(typographyVariant === 'large' ? `${s.dialogTitle} ${s.largeTitle}` : s.dialogTitle),
    typography: clsx(s.dialogTypographyTitle),
    closeBtn: clsx(s.closeButton),
  }

  function closeModalHandler() {
    onClose?.()
  }

  return (
    <Dialog.Root onOpenChange={closeModalHandler} open={open}>
      <Dialog.Trigger asChild>
        <button aria-label="Trigger">{trigger}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content className={classNames.content}>
          {modalMainTitle && (
            <Dialog.Title className={classNames.title}>
              {/* вынес логику вычисленя варианта вне jsx для чистоты
              доп класс для типографии колхозно сбивает margin
              TODO пофиксить margin от типографии и убрать лишний стиль*/}
              <Typography className={classNames.typography} variant={typographyVariant}>
                {modalMainTitle}
              </Typography>
            </Dialog.Title>
          )}
          {!restProps.hideCloseIcon && (
            <Dialog.Close asChild>
              <button className={classNames.closeBtn} aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          )}
          {/*<div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>*/}
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
