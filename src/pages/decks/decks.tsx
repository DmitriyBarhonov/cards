import { useEffect } from 'react'

import { LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import s from './decks.module.scss'
import { useStateDecks } from './decksUseStateHook'

import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PlayCircle } from '@/assets/icons/play-circle-outline.tsx'
import { TrashOutline } from '@/assets/icons/trash-outline.tsx'
import { AddUpgradeDeck, AddUpgradeType, DeleteItem } from '@/components/decks'
import { Button, Input, Typography, Table, Pagination, TabSwitcher } from '@/components/ui'
import { SliderForCards } from '@/components/ui/slider'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetMeQuery } from '@/services/auth'
import {
  // useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks'
import { decksSlice, setTabValue, updateItemsPerPage } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/decks/decks.types'
import { Column } from '@/services/types'

const columns: Column[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'cardsCount', title: 'Cards', sortable: true },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'created', title: 'Created by' },
  { key: 'action', title: 'Action' },
]
const tabOptions = [
  { label: 'My Cards', value: 'my' },
  { label: 'All Cards', value: 'all' },
]

export const Decks = () => {
  // useState
  const {
    selectedDeck,
    setSelectedDeck,
    sort,
    setSort,
    addNewDeckModal,
    setAddNewDeckModal,
    search,
    setSearch,
    deleteDeckModal,
    setDeleteDeckModal,
    updateDeckModal,
    setUpdateDeckModal,
  } = useStateDecks()

  // useDebounce
  const {
    cardsCount,
    cardsCountSettings, //cardsCountDebounce
    resetSlider,
    setCardsCount,
  } = useDebounce()
  // selector
  const tabValue = useAppSelector(state => state.decks.tabValue)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const perPage = useAppSelector(state => +state.decks.itemsPerPage)

  // other
  const dispatch = useAppDispatch()
  const navigate = useNavigate() //для перехода в карточки
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда для сортировки
  // query
  const [deleteDeck, { isLoading: isLoadingDeleteDec }] = useDeleteDeckMutation()
  const [updateDeck, { isLoading: isLoadingUpdateDeck }] = useUpdateDeckMutation()
  const [createDeck, { isLoading: isLoadingCreateDec }] = useCreateDeckMutation()
  const { data: user } = useGetMeQuery()
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    minCardsCount: cardsCountSettings[0],
    maxCardsCount: cardsCountSettings[1],
    itemsPerPage: perPage,
    name: search,
    orderBy: sortString,
    authorId: tabValue === 'my' ? user?.id : undefined,
  })

  // functions

  useEffect(() => {
    dispatch(decksSlice.actions.setMaxCardsCount(decks ? decks.maxCardsCount : 50))
  }, [decks])

  const updateCurrentPage = (page: number) => {
    dispatch(decksSlice.actions.updateCurrentPage(page))
  }
  const updateItemsPerPageHandler = (items: string) => {
    dispatch(updateItemsPerPage(items))
  }

  const tabHandler = (value: string) => {
    dispatch(setTabValue(value))
  }
  const setCardsHandler = (min: number, max: number) => {
    setCardsCount([min, max])
  }

  const clearFilterHandler = () => {
    resetSlider()
    setSearch('')
    tabHandler('all')
  }
  const createData = (data: AddUpgradeType, file?: File | null) => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('isPrivate', String(data.isPrivate || false))

    if (file) {
      formData.append('cover', file)

      //updateDeck({ id: deckId, data: formData })
      //deckHandler({ id: deckId, data: formData })
    }

    return formData
  }
  const onSubmitlCreate = (data: AddUpgradeType, file?: File | null) => {
    createDeck(createData(data, file))
  }

  const onSubmitlUpdate = (data: AddUpgradeType, file?: File | null) => {
    updateDeck({ id: selectedDeck.id, data: createData(data, file) })
  }

  return (
    <>
      {isLoadingCreateDec || isLoadingDeleteDec || isLoadingUpdateDeck || !decks ? (
        <LinearProgress color="secondary" />
      ) : null}
      <div className={s.container}>
        <Typography variant={'h2'}>Packs list</Typography>
        <div className={s.menu}>
          <Input
            className={s.search}
            variant={'search'}
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
            placeholder="Search by name"
          />
          <div>
            <Typography variant={'caption'}>Show packs cards</Typography>
            <TabSwitcher options={tabOptions} value={tabValue} onValueChange={tabHandler} />
          </div>
          <div>
            <Typography variant={'caption'}>Number of cards</Typography>
            <SliderForCards
              value={[cardsCount[0], cardsCount[1]]}
              onChange={setCardsHandler}
              disabled={false}
              max={decks ? decks.maxCardsCount : 50}
            />
          </div>
          <div className={s.wrapperButton}>
            <Button
              onClick={clearFilterHandler}
              className={s.clearFilter}
              variant="secondary"
              disabled={isLoadingCreateDec}
            >
              <TrashOutline />
              <div> {'Clear filter'}</div>
            </Button>
            <Button onClick={() => setAddNewDeckModal(true)} disabled={isLoadingCreateDec}>
              {'Add New Deck'}
            </Button>
          </div>
        </div>
        {decks?.items.length == 0 ? (
          <Table.Empty />
        ) : (
          <Table.Root>
            <Table.SortedHeader columns={columns} sort={sort} onSort={setSort} />
            <Table.Body>
              {decks?.items?.map((deck: Deck) => {
                return (
                  <Table.Row key={deck.id}>
                    <Table.Data onClick={() => navigate(`/cards/${deck.id}`)}>
                      <div>
                        {deck.cover ? (
                          <div className={s.coverContainer}>
                            <img className={s.coverImage} src={deck.cover} alt="deck cover" />
                            <Typography>{deck.name}</Typography>
                          </div>
                        ) : (
                          <Typography>{deck.name}</Typography>
                        )}
                      </div>
                    </Table.Data>
                    {/*переходим в карточки и дальше айди колоды*/}
                    <Table.Data>{deck.cardsCount}</Table.Data>
                    <Table.Data>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                    <Table.Data>{deck.author.name}</Table.Data>
                    <Table.Data className={s.iconsRow}>
                      <PlayCircle size={24} />
                      {/*если это моя колода, то покажи все иконки, иначе только learn */}
                      {user.id === deck.author.id ? (
                        <div className={'flex'}>
                          <Button
                            variant={'icon'}
                            onClick={() => {
                              setSelectedDeck(deck) //в стейт заносим нужную модалку для удаления
                              setUpdateDeckModal(true) //открываем модалку для редактирования
                            }}
                          >
                            <EdittextIcon />
                          </Button>
                          <Button
                            variant={'icon'}
                            onClick={() => {
                              setSelectedDeck(deck) //в стейт заносим нужную модалку для удаления
                              setDeleteDeckModal(true) //открываем модалку для удаления
                            }}
                          >
                            <TrashOutline size={24} />
                          </Button>
                        </div>
                      ) : null}
                    </Table.Data>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        )}
        {/*рефакторинг чтобы не было 0 если таблица пустая*/}
        <Pagination
          className={s.pagination}
          totalCount={decks?.pagination.totalItems ?? 10}
          currentPage={currentPage}
          pageSize={decks?.pagination?.itemsPerPage ?? 10}
          onPageChange={updateCurrentPage}
          selectValue={decks?.pagination.itemsPerPage}
          selectOptions={[5, 10, 15, 20]}
          onSelectChange={itemsPerPage => updateItemsPerPageHandler(itemsPerPage)}
        />
        <AddUpgradeDeck
          title={'Add New Deck'}
          buttonText={'Add New Deck'}
          onSubmit={onSubmitlCreate}
          isOpen={addNewDeckModal}
          toggleModal={setAddNewDeckModal}
        />
        {/*для создания новой колоды титул в модалку, имя кнопки, функция для создания колоды, значение открыта ли, функция для открытия или закрытия*/}
        <AddUpgradeDeck
          deckId={selectedDeck.id}
          title={'Edit Deck'}
          buttonText={'Save changes'}
          defaultValues={{ name: selectedDeck.name, isPrivate: selectedDeck.isPrivate }}
          onSubmit={onSubmitlUpdate}
          isOpen={updateDeckModal}
          toggleModal={setUpdateDeckModal}
        />
        <DeleteItem
          isOpen={deleteDeckModal} //открыта или нет конкретная модалка
          toggleModal={setDeleteDeckModal} //переключатель для открытия и закрытия модалки
          //отдаем нужную колоду для удаления, ее имя и id
          title={'Delete Deck'} //заголовок в модалке
          text={'All cards will be deleted'} //текст
          buttonText={'Delete Deck'} //текст для кнопки
          name={selectedDeck.name} //название того что удаляем
          id={selectedDeck.id} //id того что удаляем
          deleteItem={deleteDeck} //функция по удалению
        />
      </div>
    </>
  )
}