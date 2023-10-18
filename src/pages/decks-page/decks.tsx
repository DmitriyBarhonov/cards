import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './decks.module.scss'
import { useStateDecks } from './decksUseStateHook'

import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PlayCircle } from '@/assets/icons/play-circle-outline.tsx'
import { TrashOutline } from '@/assets/icons/trash-outline.tsx'
import { AddNewPack, DeleteDeck } from '@/components/decks'
import { Button, Input, Typography, Table, Pagination, TabSwitcher } from '@/components/ui'
import { SliderForCards } from '@/components/ui/slider'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { useGetMeQuery } from '@/services/auth'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import {
  decksSlice,
  setMinMaxcardsCount,
  setTabValue,
  updateItemsPerPage,
} from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/decks/decks.types.ts'
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
    timerId,
    setTimerId,
    addNewDeckModal,
    setAddNewDeckModal,
    search,
    setSearch,
    deleteDeckModal,
    setDeleteDeckModal,
    cardsCount,
    setCardsCount,
  } = useStateDecks()
  // selector
  const tabValue = useAppSelector(state => state.decks.tabValue)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const perPage = useAppSelector(state => +state.decks.itemsPerPage)
  const { maxCardsCount, minCardsCount } = useAppSelector(state => state.decks.cardsCount)

  // outher
  const dispatch = useAppDispatch()
  const navigate = useNavigate() //для перехода в карточки
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда
  // query
  const [deleteDeck] = useDeleteDeckMutation()
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const { data: user } = useGetMeQuery()
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    minCardsCount: cardsCount[0],
    maxCardsCount: cardsCount[1],
    itemsPerPage: perPage,
    name: search,
    orderBy: sortString,
    authorId: tabValue === 'my' ? user?.id : undefined,
    //если на табе Моя колода, то в useGetDecksQuery передаст в параметр имя автора,
    //то есть пользователя из useGetMeQuery
    //если на табе будет Все колоды, то запрос пойдет с undefined, и покажутся все колоды
  })

  useEffect(() => {
    if (timerId) clearTimeout(timerId)
    const newTimerId = setTimeout(() => {
      setCardsCount([minCardsCount, maxCardsCount])
    }, 1000)

    setTimerId(newTimerId)
  }, [cardsCount])
  // function

  const updateCurrentPage = (page: number) => dispatch(decksSlice.actions.updateCurrentPage(page))
  const updateItemsPerPageHandler = (items: string) => {
    dispatch(updateItemsPerPage(items))
  }

  const tabHandler = (value: string) => {
    dispatch(setTabValue(value))
  }
  const setCardsHandler = (min: number, max: number) => {
    dispatch(setMinMaxcardsCount([min, max]))
  }

  const clearFilterHandler = () => {
    dispatch(setMinMaxcardsCount([0, 50]))
    setSearch('')
    tabHandler('all')
  }

  return (
    <div className={s.container}>
      <Typography variant={'h2'}>Packs list</Typography>
      {/* времено размещен для испытаний*/}
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
            value={[minCardsCount, maxCardsCount]}
            onChange={setCardsHandler}
            disabled={false}
          />
        </div>
        <div className={s.wrapperButton}>
          <Button
            onClick={clearFilterHandler}
            className={s.clearFilter}
            variant="secondary"
            disabled={isLoading}
          >
            <TrashOutline />
            <div> {'Clear filter'}</div>
          </Button>
          <Button onClick={() => setAddNewDeckModal(true)} disabled={isLoading}>
            {'Add New Deck'}
          </Button>
        </div>
        <AddNewPack
          addDeck={createDeck}
          isOpen={addNewDeckModal}
          toggleModal={setAddNewDeckModal}
        />
      </div>
      <Table.Root>
        <Table.SortedHeader columns={columns} sort={sort} onSort={setSort} />
        {/*<Table.Row>*/}
        {/*  <Table.HeadData>Name</Table.HeadData>*/}
        {/*  <Table.HeadData>Cards</Table.HeadData>*/}
        {/*  <Table.HeadData>Last Updated</Table.HeadData>*/}
        {/*  <Table.HeadData>Created by</Table.HeadData>*/}
        {/*</Table.Row> если без сортировки*/}
        <Table.Body>
          {decks?.items?.map((deck: Deck) => {
            // console.log('table', deck)
            return (
              <Table.Row key={deck.id}>
                <Table.Data onClick={() => navigate(`/cards/${deck.id}`)}>{deck.name}</Table.Data>
                {/*переходим в карточки и дальше айди колоды*/}
                <Table.Data>{deck.cardsCount}</Table.Data>
                <Table.Data>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                <Table.Data>{deck.author.name}</Table.Data>
                <Table.Data className={s.iconsRow}>
                  <PlayCircle size={24} />
                  {/*если это моя колода, то покажи все иконки, иначе только learn */}
                  {user.id === deck.author.id ? <EdittextIcon /> : null}

                  <Button
                    variant={'icon'}
                    onClick={() => {
                      setSelectedDeck(deck) //в стейт заносим нужную модалку для удаления
                      setDeleteDeckModal(true) //открываем модалку для удаления
                    }}
                  >
                    <TrashOutline size={24} />
                  </Button>
                </Table.Data>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
      {decks?.pagination.totalItems && (
        <Pagination
          className={s.pagination}
          totalCount={decks?.pagination.totalItems ?? 10}
          currentPage={currentPage}
          pageSize={decks?.pagination.itemsPerPage}
          onPageChange={updateCurrentPage}
          selectValue={decks?.pagination.itemsPerPage}
          selectOptions={[5, 10, 15, 20]}
          onSelectChange={itemsPerPage => updateItemsPerPageHandler(itemsPerPage)}
        />
      )}
      <DeleteDeck
        isOpen={deleteDeckModal} //открыта или нет конкретная модалка
        toggleModal={setDeleteDeckModal} //переключатель для открытия и закрытия модалки
        //отдаем нужную колоду для удаления, ее имя и id
        name={selectedDeck.name}
        id={selectedDeck.id}
        deleteDeck={deleteDeck} //функция по удалению
      />
    </div>
  )
}
