import { useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowLeft } from '@/assets/icons/arrow-left.tsx'
import { Button, Input, Rating, Table, Typography } from '@/components/ui'
import { useGetACardsDeckQuery } from '@/services/decks'
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
  const { data: cards } = useGetACardsDeckQuery({ id: id ?? '' })

  // id все равно придет, но чтобы не было ошибки о типах, если нет id то будет пустая
  //что надо сделать:
  //сделать логику на своя или чужая колода
  //на свою колоду на имя добавить дропдаун
  //сделать поиск по карточкам
  //
  //тут может быть сложно: если своя колода добавть колонку c иконками редактирования и удаления,
  // если чужая то то такой колонки нет, котолнки верху в массиве columns
  //сделать модалки на создание, редактирования и удаление карточки
  //с learn cards я думаю потом разберемся, поэтапно
  // console.log(id)
  // console.log(items)

  return (
    <div className={s.container}>
      <Typography
        variant="body2"
        className={'flex justify-start cursor-pointer'}
        onClick={() => navigate(-1)}
      >
        {' '}
        <ArrowLeft />
        Back to Decks List
      </Typography>
      <div className={' mt-6 flex justify-between '}>
        <Typography variant="large">Friend&apos;s pack</Typography> {/*//заменить на {name}*/}
        <Button>Learn to Deck</Button>
      </div>
      <Input variant="search" fullWidth={true} />
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
        </div>
      )}
    </div>
  )
}
