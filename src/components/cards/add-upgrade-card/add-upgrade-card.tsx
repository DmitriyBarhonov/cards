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
  questionImg: z.instanceof(File).optional(),
  answerImg: z.instanceof(File).optional(),
})

//card будет не пустой строкой от 3 до 500 символов
type FileCategory = 'question' | 'answer'
type AddUpgradeCardType = {
  question?: string
  answer?: string
  questionImg?: File
  answerImg?: File
}
//export type FormValuesType = z.infer<typeof schema> //вытаскивает типизацию для данных формы из схемы выше
export type AddUpgradeCardProps = {
  onSubmit: (data: AddUpgradeCardType, questionFile: File | null, answerFile: File | null) => void
  defaultValues?: AddUpgradeCardType
  title: string //заголовок
  buttonText: string //текст на кнопке
  isOpen: boolean //открыта или закрыта
  toggleModal: (isOpen: boolean) => void //переключалка открытия или закрытия
  //cardHandler: (data: FormValuesType) => void //при сабмите отправляем данные типа вопрос и ответ
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
  defaultValues = { question: '', answer: '', questionImg: undefined, answerImg: undefined },
  title,
  buttonText,
  //cardHandler,
  isOpen,
  toggleModal,
  onSubmit,
}) => {
  const { handleSubmit, control, reset } = useForm<FormValuesType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues, //берем из пропсов, по умолчанию пустые
  })

  const [questionFile, setQuestionFile] = useState<File | null>(null)
  const [answerFile, setAnswerFile] = useState<File | null>(null)
  const [questionFile64, setQuestionFile64] = useState<string>('')
  const [answerFile64, setAnswerFile64] = useState<string>('')
  const loadFileText = title === 'Add New Deck' ? 'Chose a image' : 'Pick another file'
  const [selectValue, setSelectValue] = useState(optionsPrimary[0].value)

  ///
  // const onSubmit = (data: AddUpgradeCardType) => {
  //   //cardHandler(data)
  //   reset()
  //   toggleModal(false)
  //   //при сабмите фызвать функцию, сбросить значения и закрыться
  // }

  const onSubmitHandler = (data: AddUpgradeCardType) => {
    //onSubmit поулчаем из cards. Он принимает форм дату, тоесть
    //данные из нашей формы. Проблема: 1. в data не попадают наши файлы!
    // 2. сервер принимает файлы только в форм дате.
    //Чтобы решить эти вопросы, мы выносим сабмит вне этой компоненты
    //а тут просто передаем дату и отдельно файлы, там они уже соединятся
    //и отправятся на север
    //для добавления и обновления карточки ест разные сабмиты.
    //При редактирвоании просто добавим вне объекта даты id
    onSubmit(data, questionFile, answerFile)
    reset()
    setQuestionFile(null)
    setAnswerFile(null)
    toggleModal(false)
  }

  const handleFormSubmitted = handleSubmit(onSubmitHandler)
  const onOpenHandler = (isOpen: boolean) => {
    toggleModal(isOpen)
  }
  const onCloseHandler = () => {
    reset()
    setAnswerFile(null)
    setQuestionFile64('')
    setAnswerFile64('')
    toggleModal(false)
  }

  const defaultUploadHandler = (e: ChangeEvent<HTMLInputElement>, fileCategory: FileCategory) => {
    if (e.target.files && e.target.files.length) {
      const selectedFile = e.target.files[0]

      if (selectedFile.size >= 4000000) {
        alert('Photo Upload Error')

        return
      }

      const reader = new FileReader()

      reader.onloadend = () => {
        const file64 = reader.result as string

        if (fileCategory === 'question') {
          setQuestionFile(selectedFile)
          setQuestionFile64(file64)
        }

        if (fileCategory === 'answer') {
          setAnswerFile(selectedFile)
          setAnswerFile64(file64)
        }
      }

      reader.readAsDataURL(selectedFile)
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
  const questionInputRef = useRef<HTMLInputElement>(null)
  const questionSelectFileHandler = () => {
    questionInputRef && questionInputRef.current?.click()
  }

  return (
    <Modal
      onClose={onCloseHandler}
      open={isOpen}
      onOpenChange={onOpenHandler}
      modalMainTitle={title}
    >
      <form onSubmit={handleFormSubmitted}>
        <div className={s.inputsAndSelectContainer}>
          <Select
            width={'100%'}
            label={'Choose question & answer format'}
            placeholder={'chose format...'}
            options={optionsPrimary}
            value={selectValue}
            onChange={onSelectChangeHandler}
          />
          {/*question block*/}
          {selectValue === 'Text + Image' && (
            <div className={s.questionInputWrapper}>
              <Typography className={s.dragText}>Question cover:</Typography>
              <div className={s.inputContainer}>
                {questionFile && (
                  <div className={s.previewWrapper}>
                    <img
                      className={s.uploadedImgPreview}
                      src={questionFile64}
                      alt="Uploaded question file"
                    />
                  </div>
                )}
                <div className={s.inputBtnAndText}>
                  <Typography className={s.dragText}>Drag files here for upload</Typography>
                  <input
                    className={s.defaultInput}
                    onChange={e => defaultUploadHandler(e, 'question')}
                    ref={questionInputRef}
                    type="file"
                    accept="image/*"
                  />
                  <Button type="button" onClick={questionSelectFileHandler} variant={'tertiary'}>
                    {loadFileText}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <ControlledInput
            className={s.questionInput}
            name="question"
            variant={'standard'}
            placeholder={defaultValues.question}
            label={'Question text'}
            control={control}
            autoComplete="false"
          />

          {/*answer block*/}
          {selectValue === 'Text + Image' && (
            <div className={s.answerInputsWrapper}>
              <Typography className={s.dragText}>Answer cover:</Typography>
              <div className={s.inputContainer}>
                {answerFile && (
                  <div className={s.previewWrapper}>
                    <img
                      className={s.uploadedImgPreview}
                      src={answerFile64}
                      alt="Uploaded  answer file"
                    />
                  </div>
                )}
                <div className={s.inputBtnAndText}>
                  <Typography className={s.dragText}>Drag files here for upload</Typography>
                  <input
                    className={s.defaultInput}
                    onChange={e => defaultUploadHandler(e, 'answer')}
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
          <div className={'flex justify-between mb-2'}>
            <Button onClick={onCloseHandler} variant={'secondary'}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleFormSubmitted}>
              {buttonText}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
