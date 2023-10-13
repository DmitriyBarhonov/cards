import { useState } from 'react'

import s from './decks.module.scss'

import { AddNewPack } from '@/components/decks'
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
  const [addNewDeckModal, setAddNewDeckModal] = useState(false)
  // console.log(sort, sortString)
  const [search, setSearch] = useState('')
  const currentPage = useAppSelector(state => state.decks.currentPage)
  const dispatch = useAppDispatch()
  const updateCurrentPage = (page: number) => dispatch(decksSlice.actions.updateCurrentPage(page))
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const { currentData: decks } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    name: search,
    orderBy: sortString,
  })
  const [deleteDeck] = useDeleteDeckMutation()
  const [createDeck, { isLoading }] = useCreateDeckMutation()

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
        <SliderForCards disabled={false} />
        <Button onClick={() => setAddNewDeckModal(true)} disabled={isLoading}>
          {'Add New Deck'}
        </Button>
        <AddNewPack
          addDeck={createDeck}
          isOpen={addNewDeckModal}
          toggleModal={setAddNewDeckModal}
        />
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
                <Table.Data>
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
          // selectValue={itemsPerPage}
          // selectOptions={[5, 10, 20, 30]}
          // onSelectChange={setItemsPerPage} тут ошибка в типах где-то в селекте или пагинации, решу потом
        />
      )}
      {/*<ModalCard />*/}
    </div>
  )
}
