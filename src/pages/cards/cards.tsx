import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowLeft } from '@/assets/icons/arrow-left.tsx'
import { DotsInCircle } from '@/assets/icons/dots-in-circle.tsx'
import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PlayCircle } from '@/assets/icons/play-circle-outline.tsx'
import { TrashOutline } from '@/assets/icons/trash-outline.tsx'
import { AddUpgradeCard, AddUpgradeCardType } from '@/components/cards/add-upgrade-card'
import { DeleteItem } from '@/components/decks'
import { Button, Dropdown, Input, Pagination, Rating, Table, Typography } from '@/components/ui'
import { DropdownItem } from '@/components/ui/dropdown-menu/custom-drop-down'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { useGetMeQuery } from '@/services/auth'
import {
  useDeleteCardMutation,
  useGetCardsDeckQuery,
  useUpdateCardMutation,
  useCreateCardMutation,
} from '@/services/cards'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Card } from '@/services/cards/cards.types.ts'
import { useGetDeckByIdQuery } from '@/services/decks'
import { Column, Sort } from '@/services/types'

const columns: Column[] = [
  { key: 'question', title: 'Question', sortable: true },
  { key: 'answer', title: 'Answer', sortable: true },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'grade', title: 'Grade' },
  { key: 'action', title: ' ' },
]

export const CardsPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const perPage = useAppSelector(state => +state.cards.itemsPerPage)
  const { id } = useParams<{ id: string }>() //вытаскиваем айди из строки
  const [search, setSearch] = useState('') //для поиска по карточкамив колоде
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда для сортировки
  const { data: user } = useGetMeQuery() //вытаскиеваем даные пользователя
  const { data: cards, isLoading } = useGetCardsDeckQuery({
    id: id ?? '',
    question: search,
    orderBy: sortString,
    itemsPerPage: perPage,
    currentPage,
  })
  const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' })
  const [deleteCard] = useDeleteCardMutation()
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()
  // id все равно придет, но чтобы не было ошибки о типах, если нет id то будет пустая
  const [selectedCard, setSelectedCard] = useState<Card>({} as Card) //для удаления или редактирования нужной карточки
  const [addNewCardModal, setAddNewCardModal] = useState(false)
  const [updateCardModal, setUpdateCardModal] = useState(false)
  const [deleteCardModal, setDeleteCardModal] = useState(false)

  const updateCurrentPage = (page: number) => {
    dispatch(cardsSlice.actions.updateCurrentPage(page))
  }
  const updateItemsPerPageHandler = (items: string) => {
    dispatch(cardsSlice.actions.updateItemsPerPage(items))
  }

  const isDeckMine = deck?.userId === user?.id // в переменную моя колода или нет

  const createCardData = (
    cardData: AddUpgradeCardType,
    questionImg?: File | null,
    answerImg?: File | null
  ) => {
    //сервер принимает файл только в формате FormData, поэтому берем data
    // и превращаем ее в формдата + добавляем в форм дату файлы
    //По итогу мы возвр формдату для add/edit по необходимости (с и без id)
    const formData = new FormData()

    // formData.append('question', data.question)
    // formData.append('answer', data.answer)
    formData.append('question', cardData.question)
    formData.append('answer', cardData.answer)

    if (questionImg) {
      formData.append('questionImg', questionImg)
    }
    if (answerImg) {
      formData.append('answerImg', answerImg)
    }

    return formData
  }

  const onSubmitCreateCard = (
    cardData: AddUpgradeCardType,
    questionImg?: File | null,
    answerImg?: File | null
  ) => {
    const data = createCardData(cardData, questionImg, answerImg)
    //в этой переменной будет результат выполнения функции createCardData
    //тоесть в ней будут наши данные в формате FormData

    if (deck?.id) {
      createCard({ id: deck.id, data })
    }
  }

  const onSubmitEditCard = (
    cardData: AddUpgradeCardType,
    questionImg?: File | null,
    answerImg?: File | null
  ) => {
    const data = createCardData(cardData, questionImg, answerImg) // Assuming `createCardData` returns the desired `formData`

    if (deck?.id) {
      updateCard({ id: selectedCard.id, data })
    }
  }
  const redirectToLearn = () => {
    navigate(`/learn/${id}`)
  }

  return (
    <div className={s.container}>
      <Typography
        variant="body2"
        className={'flex justify-start cursor-pointer'}
        onClick={() => navigate(-1)}
      >
        {/* верни на страницу назад */} <ArrowLeft />
        Back to Decks List
      </Typography>
      <div className={'mt-6 flex justify-between '}>
        <div className={'flex justify-start'}>
          <Typography variant="large">{deck?.name}</Typography>

          {isDeckMine && (
            <Dropdown trigger={<DotsInCircle className={'ml-2'} />} width={100}>
              <div>
                <DropdownItem
                  border={false}
                  icon={<PlayCircle size={24} />}
                  element={<Typography className={'ml-2 mt-2'}>Learn</Typography>}
                />
                <DropdownItem
                  border={true}
                  icon={<EdittextIcon />}
                  element={<Typography className={'ml-2 mt-2'}>Edit</Typography>}
                />
                <DropdownItem
                  border={true}
                  icon={<TrashOutline size={24} />}
                  element={<Typography className={'ml-2 mt-2'}>Delete</Typography>}
                />
              </div>
            </Dropdown>
          )}
        </div>
        {isDeckMine ? (
          <Button variant="primary" onClick={() => setAddNewCardModal(true)}>
            Add New Card
          </Button>
        ) : (
          <Button onClick={redirectToLearn}>Learn this Deck</Button>
        )}
      </div>
      {/*Есть обложка коллоды? отрисует!*/}
      {deck?.cover && (
        <div className={s.deckCoverContainer}>
          <img className={s.deckCoverImage} src={deck.cover} alt="deck cover" />
        </div>
      )}
      <Input
        variant="search"
        fullWidth={true}
        placeholder={'Input search'}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      {isLoading && <Typography variant={'large'}>Loading...</Typography>}
      {/*если есть какие то карточки то верни таблицу, иначе предложи создать новую карточку*/}
      {/*показывай пусту таблицу даже если грузится, иначе показывается див с инфой что нет таблиц*/}
      {cards?.items.length || isLoading ? (
        <Table.Root>
          <Table.SortedHeader
            columns={columns.filter(column => (isDeckMine ? true : column.title !== ' '))}
            sort={sort}
            onSort={setSort}
          />
          <Table.Body>
            {cards?.items.map((card: Card) => {
              return (
                <Table.Row key={card.id}>
                  <Table.Data>
                    <div>
                      {card.questionImg ? (
                        <div className={s.coverContainer}>
                          <img
                            className={s.coverImage}
                            src={card.questionImg}
                            alt="card question"
                          />
                          <Typography>{card.question}</Typography>
                        </div>
                      ) : (
                        <Typography>{card.question}</Typography>
                      )}
                    </div>
                  </Table.Data>
                  <Table.Data>
                    <div>
                      {card.answerImg ? (
                        <div className={s.coverContainer}>
                          <img className={s.coverImage} src={card.answerImg} alt="card question" />
                          <Typography>{card.answer}</Typography>
                        </div>
                      ) : (
                        <Typography>{card.answer}</Typography>
                      )}
                    </div>
                  </Table.Data>
                  <Table.Data>{new Date(card.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                  <Table.Data>
                    <Rating rating={card.grade} />
                  </Table.Data>
                  {isDeckMine && (
                    <Table.Data>
                      <div className={'flex'}>
                        <Button
                          variant={'icon'}
                          onClick={() => {
                            setSelectedCard(card) //в стейт заносим нужную модалку для удаления
                            setUpdateCardModal(true) //открываем модалку для удаления
                          }}
                        >
                          <EdittextIcon />
                        </Button>
                        <Button
                          variant={'icon'}
                          onClick={() => {
                            setSelectedCard(card) //в стейт заносим нужную модалку для удаления
                            setDeleteCardModal(true) //открываем модалку для удаления
                          }}
                        >
                          <TrashOutline size={24} />
                        </Button>
                      </div>
                    </Table.Data>
                  )}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <div className={s.empty}>
          <Typography variant="body2">This pack is empty.</Typography>
          {isDeckMine && (
            <Button variant="primary" onClick={() => setAddNewCardModal(true)}>
              Add New Card
            </Button>
          )}
        </div>
      )}
      <Pagination
        className={s.pagination}
        totalCount={cards?.pagination.totalItems ?? 10}
        currentPage={currentPage}
        pageSize={cards?.pagination.itemsPerPage ?? 5}
        onPageChange={updateCurrentPage}
        selectValue={cards?.pagination.itemsPerPage}
        selectOptions={[5, 10, 15, 20]}
        onSelectChange={itemsPerPage => updateItemsPerPageHandler(itemsPerPage)}
      />
      <AddUpgradeCard
        title={'Add New Card'}
        buttonText={'Add New Card'}
        isOpen={addNewCardModal}
        toggleModal={setAddNewCardModal}
        onSubmit={onSubmitCreateCard}
      />
      <AddUpgradeCard
        defaultValues={{ question: selectedCard.question, answer: selectedCard.answer }}
        title={'Edit Card'}
        buttonText={'Save Changes'}
        isOpen={updateCardModal}
        toggleModal={setUpdateCardModal}
        onSubmit={onSubmitEditCard}
      />
      <DeleteItem
        isOpen={deleteCardModal} //открыта или нет конкретная модалка
        toggleModal={setDeleteCardModal} //переключатель для открытия и закрытия модалки
        //отдаем нужную колоду для удаления, ее имя и id
        title={'Delete Card'} //заголовок в модалке
        text={'All info will be deleted'} //текст
        buttonText={'Delete Card'} //текст для кнопки
        name={selectedCard.question} //название того что удаляем
        id={selectedCard.id} //id того что удаляем
        deleteItem={deleteCard} //функция по удалению
      />
    </div>
  )
}
