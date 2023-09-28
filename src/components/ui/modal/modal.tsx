import { FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './modal.module.scss'

import { Typography } from '@/components/ui'

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  onClose?: () => void
  showCloseIcon?: boolean
  modalMainTitle?: string
  modalTitleVariant?: 'default' | 'large'
}
export const Modal: FC<ModalProps> = ({
  onClose,

  open,
  modalMainTitle,
  children,
  ...restProps
}) => {
  const typographyVariant = restProps.modalTitleVariant === 'default' ? 'h1' : 'large'

  const classNames = {
    root: clsx(s.rootModalContainer),
    button: clsx(s.modalButton),
    overlay: clsx(s.dialogOverlay),
    content: clsx(s.dialogContent),
    //если будет нужен большой тайтл, добавим доп.класс
    title: clsx(typographyVariant === 'large' ? `${s.dialogTitle} ${s.largeTitle}` : s.dialogTitle),
    typography: clsx(s.dialogTypographyTitle),
  }

  function closeModalHandler() {
    onClose?.()
  }

  return (
    <Dialog.Root onOpenChange={closeModalHandler} open={open}>
      {/*<Dialog.Trigger asChild>*/}
      {/*  <Button className={classNames.button}>{modalButtonTitle}</Button>*/}
      {/*</Dialog.Trigger>
      В модалках от радикса есть триггер, то что при нажатии открывает
      Я посмотрел что Андрей это не исползует, а вешает эту функцию
      на то, что ему надо. Решил пойти по тому же пути
      Потому что так проще. Поэтмоу триггер тут закоментен*/}
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
          {restProps.showCloseIcon && (
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
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
