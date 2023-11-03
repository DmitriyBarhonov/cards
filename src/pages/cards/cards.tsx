import { useState } from 'react'

import { LinearProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'
import { useStateCard } from './cardsUsestateHook'

import { ArrowLeft } from '@/assets/icons/arrow-left.tsx'
import { DotsInCircle } from '@/assets/icons/dots-in-circle.tsx'
import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PlayCircle } from '@/assets/icons/play-circle-outline.tsx'
import { TrashOutline } from '@/assets/icons/trash-outline.tsx'
import { AddUpgradeCard, FormValuesType } from '@/components/cards/add-upgrade-card'
import { AddUpgradeDeck, AddUpgradeType, DeleteItem } from '@/components/decks'
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
import { useDeleteDeckMutation, useGetDeckByIdQuery, useUpdateDeckMutation } from '@/services/decks'
import { Card } from '@/services/decks/decks.types.ts'
import { Column } from '@/services/types'

const columns: Column[] = [
  { key: 'question', title: 'Question', sortable: true },
  { key: 'answer', title: 'Answer', sortable: true },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'grade', title: 'Grade' },
  { key: 'action', title: ' ' },
]

export const CardsPage = () => {
  const {
    selectedCard,
    setSelectedCard,
    addNewCardModal,
    setAddNewCardModal,
    updateCardModal,
    setUpdateCardModal,
    deleteCardModal,
    setDeleteCardModal,
    search,
    setSearch,
    sort,
    setSort,
  } = useStateCard()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const perPage = useAppSelector(state => +state.cards.itemsPerPage)
  const { id } = useParams<{ id: string }>() //вытаскиваем айди из строки
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда для сортировки
  // query
  const [deleteDeck, result] = useDeleteDeckMutation()
  const { data: user } = useGetMeQuery() //вытаскиеваем даные пользователя
  const { data: cards, isLoading } = useGetCardsDeckQuery({
    id: id ?? '',
    question: search,
    orderBy: sortString,
    itemsPerPage: perPage,
    currentPage,
  })
  const [updateDeck] = useUpdateDeckMutation()
  const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' })
  const [deleteCard] = useDeleteCardMutation()
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const [updateDeckModal, setUpdateDeckModal] = useState(false)
  const [deleteDeckModal, setDeleteDeckModal] = useState(false)

  const myDeck = deck?.userId === user?.id

  console.log(deleteDeckModal)

  const updateCurrentPage = (page: number) => {
    dispatch(cardsSlice.actions.updateCurrentPage(page))
  }
  const updateItemsPerPageHandler = (items: string) => {
    dispatch(cardsSlice.actions.updateItemsPerPage(items))
  }
  const createCardHandler = (data: FormValuesType) => {
    if (deck?.id) {
      createCard({ id: deck.id, data })
    }
  }
  // Edit deck
  const createData = (data: AddUpgradeType, file?: File | null) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate || false))

    if (file) {
      formData.append('cover', file)
    }

    return formData
  }
  const onSubmitlUpdateDeck = (data: AddUpgradeType, file?: File | null) => {
    updateDeck({ id: deck?.id || '', data: createData(data, file) })
  }

  const redirectToLearn = () => {
    navigate(`/learn/${id}`)
  }

  if (result.isSuccess) navigate('/')

  return (
    <>
      {isLoading && <LinearProgress />}
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

            {myDeck && (
              <Dropdown trigger={<DotsInCircle className={'ml-2'} />} width={150}>
                <div>
                  {' '}
                  <div className={s.dropdownElement}>
                    <DropdownItem
                      border={false}
                      icon={<PlayCircle size={24} />}
                      element={
                        <Typography as={'button'} onClick={redirectToLearn} variant={'h3'}>
                          Learn
                        </Typography>
                      }
                    />
                  </div>
                  <div className={s.dropdownElement}>
                    <DropdownItem
                      border={true}
                      icon={<EdittextIcon />}
                      element={
                        <Typography
                          as={'button'}
                          onClick={() =>
                            setTimeout(() => {
                              setUpdateDeckModal(true)
                            }, 200)
                          }
                          variant={'h3'}
                        >
                          Edit
                        </Typography>
                      }
                    />
                  </div>
                  <div className={s.dropdownElement}>
                    <DropdownItem
                      onClick={() => setDeleteDeckModal(true)}
                      border={true}
                      icon={<TrashOutline size={24} />}
                      element={
                        <Typography
                          as={'button'}
                          onClick={() => setDeleteDeckModal(true)}
                          variant={'h3'}
                        >
                          Delete
                        </Typography>
                      }
                    />
                  </div>
                </div>
              </Dropdown>
            )}
          </div>
          {myDeck ? (
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
              columns={columns.filter(column => (myDeck ? true : column.title !== ' '))}
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
                            <img
                              className={s.coverImage}
                              src={card.answerImg}
                              alt="card question"
                            />
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
                    {myDeck && (
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
            {myDeck && (
              <Button variant="primary" onClick={() => setAddNewCardModal(true)}>
                Add New Card
              </Button>
            )}
          </div>
        )}
        {/* Modal */}
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
          cardHandler={createCardHandler}
        />
        <AddUpgradeCard
          defaultValues={{ question: selectedCard.question, answer: selectedCard.answer }}
          title={'Edit Card'}
          buttonText={'Save Changes'}
          isOpen={updateCardModal}
          toggleModal={setUpdateCardModal}
          cardHandler={data => {
            updateCard({ id: selectedCard.id, data })
          }}
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
      <DeleteItem
        isOpen={deleteDeckModal} //открыта или нет конкретная модалка
        toggleModal={setDeleteDeckModal} //переключатель для открытия и закрытия модалки
        //отдаем нужную колоду для удаления, ее имя и id
        title={'Delete Deck'} //заголовок в модалке
        text={'All cards will be deleted'} //текст
        buttonText={'Delete Deck'} //текст для кнопки
        name={deck?.name || ''} //название того что удаляем
        id={deck?.id || ''} //id того что удаляем
        deleteItem={deleteDeck} //функция по удалению
      />
      <AddUpgradeDeck
        deckId={id}
        title={'Edit Deck'}
        buttonText={'Save changes'}
        defaultValues={{ name: deck?.name || '', isPrivate: deck?.isPrivate }}
        onSubmit={onSubmitlUpdateDeck}
        isOpen={updateDeckModal}
        toggleModal={setUpdateDeckModal}
      />
    </>
  )
}

// <AddUpgradeDeck
// deckId={id}
// title={'Edit Deck'}
// buttonText={'Save changes'}
// defaultValues={{ name: deck?.name || '', isPrivate: deck?.isPrivate }}
// onSubmit={onSubmitlUpdateDeck}
// isOpen={updateDeckModal}
// toggleModal={setUpdateDeckModal}
// />

// <DeleteItem
// isOpen={deleteDeckModal} //открыта или нет конкретная модалка
// toggleModal={setDeleteDeckModal} //переключатель для открытия и закрытия модалки
// //отдаем нужную колоду для удаления, ее имя и id
// title={'Delete Deck'} //заголовок в модалке
// text={'All cards will be deleted'} //текст
// buttonText={'Delete Deck'} //текст для кнопки
// name={deck?.name || ''} //название того что удаляем
// id={deck?.id || ''} //id того что удаляем
// deleteItem={deleteDeck} //функция по удалению
// />
