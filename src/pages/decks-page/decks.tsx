import { useState } from 'react'

import s from './decks.module.scss'

import { TrashOutline } from '@/assets/icons/trash-outline.tsx'
import { DeleteDeck } from '@/components/decks'
import { Button, Input, Typography, Table, Pagination } from '@/components/ui'
import { SliderForCards } from '@/components/ui/slider'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/decks/decks.types.ts'
import { Column, Sort } from '@/services/types'
const columns: Column[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'cardsCount', title: 'Cards', sortable: true },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'created', title: 'Created by' },
  { key: 'action', title: 'Action' },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда
  const [search, setSearch] = useState('')
  const [deleteDeckModal, setDeleteDeckModal] = useState(false)
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const dispatch = useAppDispatch()
  const updateCurrentPage = (page: number) => dispatch(decksSlice.actions.updateCurrentPage(page))
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: search,
    orderBy: sortString,
  })
  const [deleteDeck] = useDeleteDeckMutation()
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const [selectedDeck, setSelectedDeck] = useState<Deck>({} as Deck) //для удаления нужной колоды

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
        <SliderForCards disabled={false} />
        <Button
          style={{ marginLeft: '6px' }}
          onClick={() => {
            updateCurrentPage(1)
            createDeck({ name: '321312' })
          }}
        >
          create Deck
        </Button>
        <Button
          style={{ marginLeft: '6px' }}
          onClick={() => {
            setItemsPerPage(20)
          }}
          disabled={isLoading}
        >
          set 20 items
        </Button>
        <Button
          style={{ marginLeft: '6px' }}
          onClick={() => {
            setItemsPerPage(10)
          }}
          disabled={isLoading}
        >
          set 10 items
        </Button>
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
                <Table.Data>{deck.name}</Table.Data>
                <Table.Data>{deck.cardsCount}</Table.Data>
                <Table.Data>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                <Table.Data>{deck.author.name}</Table.Data>
                <Table.Data>
                  <Button
                    variant={'icon'}
                    onClick={() => {
                      setSelectedDeck(deck) //в стейт заносим нужную модалку для удаления
                      setDeleteDeckModal(true) //открываем модалку для удаления
                    }}
                  >
                    <TrashOutline />
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
          totalCount={decks?.pagination.totalItems}
          currentPage={currentPage}
          pageSize={itemsPerPage}
          onPageChange={updateCurrentPage}
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
      {/*{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (*/}
      {/*  <Button*/}
      {/*    style={{ marginTop: '20px', marginLeft: '6px' }}*/}
      {/*    key={item}*/}
      {/*    onClick={() => {*/}
      {/*      updateCurrentPage(item)*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    {item}*/}
      {/*  </Button>*/}
      {/*))}*/}
    </div>
  )
}
