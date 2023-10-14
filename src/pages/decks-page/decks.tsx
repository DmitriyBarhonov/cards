import { useState } from 'react'

import s from './decks.module.scss'

import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PlayCircle } from '@/assets/icons/play-circle-outline.tsx'
import { Button, Input, Typography, Table, Pagination, TabSwitcher } from '@/components/ui'
import { SliderForCards } from '@/components/ui/slider'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks.ts'
import { useGetMeQuery } from '@/services/auth'
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
const tabOptions = [
  { label: 'My Cards', value: 'my' },
  { label: 'All Cards', value: 'all' },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })
  const sortString = sort ? `${sort.key}-${sort.direction}` : null //строка для бэкэнда

  // console.log(sort, sortString)
  const [tabValue, setTabValue] = useState('my')

  const [search, setSearch] = useState('')
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const dispatch = useAppDispatch()
  const updateCurrentPage = (page: number) => dispatch(decksSlice.actions.updateCurrentPage(page))

  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { data: user } = useGetMeQuery()
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: search,
    orderBy: sortString,
    authorId: tabValue === 'my' ? user?.id : undefined,
    //если на табе Моя колода, то в useGetDecksQuery передаст в параметр имя автора,
    //то есть пользователя из useGetMeQuery
    //если на табе будет Все колоды, то запрос пойдет с undefined, и покажутся все колоды
  })
  // totalPages: number
  // currentPage: number
  // itemsPerPage: number
  // totalItems: number

  const [deleteDeck] = useDeleteDeckMutation()
  const [createDeck, { isLoading }] = useCreateDeckMutation()
  const tabHandler = (value: string) => {
    setTabValue(value)
  }

  //if (decks.isError) return <div>decks.isError</div>
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
          <SliderForCards disabled={false} />
        </div>

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
            return (
              <Table.Row key={deck.id}>
                <Table.Data>{deck.name}</Table.Data>
                <Table.Data>{deck.cardsCount}</Table.Data>
                <Table.Data>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                <Table.Data>{deck.author.name}</Table.Data>
                <Table.Data className={s.iconsRow}>
                  <PlayCircle size={24} />
                  {/*если это моя колода, то покажи все иконки, иначе только learn */}
                  {user.id === deck.author.id ? <EdittextIcon /> : null}

                  <Button
                    onClick={() => {
                      deleteDeck({ id: deck.id })
                    }}
                  >
                    delete
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
