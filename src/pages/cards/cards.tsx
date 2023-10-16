import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowLeft } from '@/assets/icons/arrow-left.tsx'
import { DotsInCircle } from '@/assets/icons/dots-in-circle.tsx'
import { EdittextIcon } from '@/assets/icons/edit-text.tsx'
import { PlayCircle } from '@/assets/icons/play-circle-outline.tsx'
import { TrashOutline } from '@/assets/icons/trash-outline.tsx'
import { Button, Dropdown, Input, Rating, Table, Typography } from '@/components/ui'
import { DropdownItem } from '@/components/ui/dropdown-menu/custom-drop-down'
import { useGetMeQuery } from '@/services/auth'
import { useGetACardsDeckQuery, useGetDeckByIdQuery } from '@/services/decks'
import { Card } from '@/services/decks/decks.types.ts'
import { Column } from '@/services/types'

const columns: Column[] = [
  { key: 'name', title: 'Question' },
  { key: 'cardsCount', title: 'Answer' },
  { key: 'updated', title: 'Last Updated', sortable: true },
  { key: 'created', title: 'Grade' },
  { key: 'action', title: 'Action' },
]

export const Cards = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() //вытаскиваем айди из строки
  const [search, setSearch] = useState('') //для поиска по карточкамив колоде
  const { data: user } = useGetMeQuery() //вытаскиеваем даные пользователя
  const { data: cards } = useGetACardsDeckQuery({ id: id ?? '', question: search })
  const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' })
  // id все равно придет, но чтобы не было ошибки о типах, если нет id то будет пустая
  const myDeck = deck?.userId === user?.id // в переменную моя колода или нет

  //что надо сделать:
  //
  //тут может быть сложно: если своя колода добавть колонку c иконками редактирования и удаления,
  // если чужая то то такой колонки нет, котолнки верху в массиве columns
  //сделать модалки на создание, редактирования и удаление карточки
  //с learn cards я думаю потом разберемся, поэтапно

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
      <div className={' mt-6 flex justify-between '}>
        <div className={'flex justify-start'}>
          <Typography variant="large">{deck?.name}</Typography>
          {myDeck && (
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

        <Button>Learn to Deck</Button>
      </div>
      <Input
        variant="search"
        fullWidth={true}
        placeholder={'Input search'}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      {/*если есть какие то карточки то верни таблицу, иначе предложи создать новую карточку*/}
      {cards?.items.length ? (
        <Table.Root>
          <Table.SortedHeader columns={columns} />
          <Table.Body>
            {cards?.items.map((card: Card) => {
              return (
                <Table.Row key={card.id}>
                  <Table.Data>{card.question}</Table.Data>
                  <Table.Data>{card.answer}</Table.Data>
                  <Table.Data>{new Date(card.updated).toLocaleDateString('ru-Ru')}</Table.Data>
                  <Table.Data>
                    <Rating rating={card.grade} />
                  </Table.Data>
                  <Table.Data>Icons for action</Table.Data>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <div className={s.empty}>
          <Typography variant="body2">
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button variant="primary">Add New Card</Button>
          {/*навесить логику создания новой карточки*/}
        </div>
      )}
    </div>
  )
}
