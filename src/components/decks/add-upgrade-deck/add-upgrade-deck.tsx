import { ChangeEvent, FC, useRef, useState, DragEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-upgrade-deck.module.scss'

import { Button, Modal, Typography } from '@/components/ui'
import { ControlledInput, ControlledCheckbox } from '@/components/ui/controlled'

const schema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('Enter deck name')
    .min(3, 'Deck name must be at least 4 symbols')
    .max(30, 'Deck name must be less than 30 symbols'),
  isPrivate: z.boolean().optional(), //если не будет optional, то всегда надо нажимать галочку, а это не надо
  cover: z.instanceof(File).optional(),
})

export type AddUpgradeType = {
  name: string
  isPrivate?: boolean | undefined
  cover?: File
}

export type AddUpgradeDeckProps = {
  defaultValues?: AddUpgradeType
  title: string
  buttonText: string
  isOpen: boolean
  toggleModal: (isOpen: boolean) => void

  onSubmit: (formData: AddUpgradeType, file: File | null) => void
}
export const AddUpgradeDeck: FC<AddUpgradeDeckProps> = ({
  defaultValues = { name: '', isPrivate: false, cover: undefined },
  title,
  buttonText,
  onSubmit,
  isOpen,
  toggleModal,
}) => {
  const { handleSubmit, control, reset, resetField } = useForm<AddUpgradeType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues, //берем из пропсов, по умолчанию пустые
  })

  const [file, setFile] = useState<File | null>(null)
  const [file64, setFile64] = useState<string>('')
  const [drag, setDrag] = useState<boolean>(false)
  const loadFileText = title === 'Add New Deck' ? 'Chose a image' : 'Pick another file'

  const onSubmitHandler = (formData: AddUpgradeType) => {
    onSubmit(formData, file)
    resetField('name')
    setFile(null)
    toggleModal(false)
  }
  let handleFormSubmitted = handleSubmit(onSubmitHandler)
  const onOpenHandler = (isOpen: boolean) => {
    toggleModal(isOpen)
  }
  const onCloseHandler = () => {
    reset()
    toggleModal(false)
  }
  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  const onDropFileHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    let selectedFiles = e.dataTransfer.files

    setDrag(false)

    if (selectedFiles.length > 0) {
      const file = selectedFiles[0]

      if (file.size < 4000000) {
        setFile(file)
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string

          setFile64(file64)
        }

        reader.readAsDataURL(file)
      } else {
        alert('Photo Upload Error')
      }
    }
  }
  const defaultUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const selectedFile = e.target.files[0]

      if (selectedFile.size < 4000000) {
        setFile(selectedFile)
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string

          setFile64(file64)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        alert('Photo Upload Error')
      }
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return (
    <Modal
      onClose={onCloseHandler}
      open={isOpen}
      onOpenChange={onOpenHandler}
      modalMainTitle={title}
    >
      <form onSubmit={handleFormSubmitted}>
        <div className={s.dragAndDropArea}>
          {drag ? (
            <div
              className={s.dropArea}
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              onDrop={e => onDropFileHandler(e)}
            >
              <Typography variant={'h2'}>Release the new file here</Typography>
            </div>
          ) : (
            <div
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
            >
              <div className={s.inputContainer}>
                {file && (
                  <div className={s.previewWrapper}>
                    <img className={s.uploadedImgPreview} src={file64} alt="Uploaded file" />
                  </div>
                )}
                <div className={s.inputBtnAndText}>
                  <Typography className={s.dragText}>Drag files here for upload</Typography>
                  <input
                    className={s.defaultInput}
                    onChange={e => defaultUploadHandler(e)}
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                  />
                  <Button type="button" onClick={selectFileHandler} variant={'tertiary'}>
                    {loadFileText}
                  </Button>
                </div>
              </div>
              <ControlledInput
                className={'fWidth'}
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
                <Button type="submit" onClick={handleFormSubmitted}>
                  {buttonText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Modal>
  )
}
