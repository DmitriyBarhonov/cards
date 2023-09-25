import { FC } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './modal.module.scss'

import { Button, Typography } from '@/components/ui'

type ModalProps = {
  modalButtonTitle: string
  modalMainTitle?: string
  modalTitleVariant?: 'default' | 'large'
}
export const Modal: FC<ModalProps> = ({ modalButtonTitle, modalMainTitle, ...restProps }) => {
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

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className={classNames.button}>{modalButtonTitle}</Button>
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
          <Dialog.Description className="DialogDescription">
            Make changes to your profile here. Click save when done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input className="Input" id="name" defaultValue="Pedro Duarte" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input className="Input" id="username" defaultValue="@peduarte" />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
