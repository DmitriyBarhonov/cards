import { ChangeEvent, FC, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-upgrade-card.module.scss'

import { Button, Modal, Select, Typography } from '@/components/ui'
import { ControlledInput } from '@/components/ui/controlled-input'

const schema = z.object({
  question: z
    .string()
    .trim()
    .nonempty('Enter card question')
    .min(4, 'Card question must be at least 4 symbols')
    .max(500, 'Card question must be less than 500 symbols')
    .optional(),
  answer: z
    .string()
    .trim()
    .nonempty('Enter card question')
    .min(4, 'Card question must be at least 4 symbols')
    .max(500, 'Card question must be less than 500 symbols')
    .optional(),
})
//card будет не пустой строкой от 3 до 500 символов

export type FormValuesType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type AddUpgradeCardProps = {
  defaultValues?: FormValuesType //используем при вызове для upgrade
  title: string //заголовок
  buttonText: string //текст на кнопке
  isOpen: boolean //открыта или закрыта
  toggleModal: (isOpen: boolean) => void //переключалка открытия или закрытия
  cardHandler: (data: FormValuesType) => void //при сабмите отправляем данные типа вопрос и ответ
  //если createDeck, то передаем просто функцию,
  //если upgrade, то на месте вызова компоненты передаем еще и id колоды
}
const optionsPrimary = [
  {
    value: 'Text',
    label: 'Text',
  },
  {
    value: 'Text + Image',
    label: 'Text + Image',
  },
  {
    value: 'Video (unavailable)',
    label: 'Video (unavailable)',
  },
]

export const AddUpgradeCard: FC<AddUpgradeCardProps> = ({
  defaultValues = { question: '', answer: '' },
  title,
  buttonText,
  cardHandler,
  isOpen,
  toggleModal,
}) => {
  const { handleSubmit, control, reset } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues, //берем из пропсов, по умолчанию пустые
  })

  const [file, setFile] = useState<File | null>(null)
  const [file64, setFile64] = useState<string>('')
  const [drag, setDrag] = useState<boolean>(false)
  const loadFileText = title === 'Add New Deck' ? 'Chose a image' : 'Pick another file'
  const [selectValue, setSelectValue] = useState(optionsPrimary[0].value)

  ///
  const onSubmit = (data: FormValuesType) => {
    cardHandler(data)
    reset()
    toggleModal(false)
    //при сабмите фызвать функцию, сбросить значения и закрыться
  }

  const handleFormSubmitted = handleSubmit(onSubmit)
  const onOpenHandler = (isOpen: boolean) => {
    toggleModal(isOpen)
  }
  const onCloseHandler = () => {
    reset()
    setFile(null)
    setFile64('')
    toggleModal(false)
  }
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setSelectValue('Text + Image')
    setDrag(true)
  }
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  const onDropFileHandler = (e: React.DragEvent<HTMLDivElement>) => {
    //TODO объеденить / зрефакторить с defaultUploadHandler
    //код почти одинаковый
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
        //для будущего вывода ошибок
        console.log('Photo Upload Error')
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
        //для будущего вывода ошибок
        console.log('Photo Upload Error')
      }
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const onSelectChangeHandler = (newSelectValue: string) => {
    if (newSelectValue) {
      setSelectValue(newSelectValue)
    }

    return newSelectValue
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
              <Select
                width={'100%'}
                label={'Choose question & answer format'}
                placeholder={'chose format...'}
                options={optionsPrimary}
                value={selectValue}
                onChange={onSelectChangeHandler}
              />

              {selectValue === 'Text + Image' && (
                <div className={s.textAndInputWrapper}>
                  <Typography className={s.dragText}>Question cover:</Typography>
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
                </div>
              )}

              <ControlledInput
                className={s.cardInput}
                name="question"
                variant={'standard'}
                placeholder={defaultValues.question}
                label={'Question text'}
                control={control}
                autoComplete="false"
              />

              {selectValue === 'Text + Image' && (
                <div className={s.textAndInputWrapper}>
                  <Typography className={s.dragText}>Question cover:</Typography>
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
                </div>
              )}
              <ControlledInput
                className={s.answerInput}
                name="answer"
                variant={'standard'}
                placeholder={defaultValues.answer}
                label={'Answer text'}
                control={control}
                autoComplete="false"
              />
              <div className={'flex justify-between'}>
                <Button onClick={onCloseHandler} variant={'secondary'}>
                  Cancel
                </Button>
                <Button type="submit">{buttonText}</Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Modal>
  )
}
