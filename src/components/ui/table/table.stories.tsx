import { useMemo, useState } from 'react'

import { Meta } from '@storybook/react'

import { Typography } from '../typography'

import { Table } from './table'

import { SortUp } from '@/assets/icons/up.tsx'
import { Column, Sort } from '@/services/types'

export default {
  title: 'Components/Table',
  component: Table.Root,
} as Meta<typeof Table.Root>

export const Default = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeadData>Название</Table.HeadData>
            <Table.HeadData align="center">Описание</Table.HeadData>
            <Table.HeadData>Ссылка</Table.HeadData>
            <Table.HeadData>Тип</Table.HeadData>
            <Table.HeadData>Вид</Table.HeadData>
            <Table.HeadData />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Data>Web Basic</Table.Data>
            <Table.Data>
              Some data Some data Some data Some data Some data Some data Some data
            </Table.Data>
            <Table.Data>
              <Typography as={'a'} variant={'link1'} href="https://google.com/" target="_blank">
                Ссылка
              </Typography>
            </Table.Data>
            <Table.Data>Основной</Table.Data>
            <Table.Data>Читать</Table.Data>
            <Table.Data>
              <SortUp />
            </Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>Web Basic</Table.Data>
            <Table.Data>
              Another data Another data Another data Another data Another data Another data
            </Table.Data>
            <Table.Data>ссылка</Table.Data>
            <Table.Data>Основной</Table.Data>
            <Table.Data>Читать</Table.Data>
            <Table.Data>✨</Table.Data>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
}

const data = [
  {
    id: '01',
    title: 'Title',
    description: 'Description',
    link: 'https://www.google.com/',
    category: 'Main',
    type: 'Type',
  },
  {
    id: '02',
    title: 'Some title',
    description: 'Some description',
    link: 'https://www.google.com/',
    category: 'Main',
    type: 'Some type',
  },
  {
    id: '03',
    title: 'Another title',
    description: 'Another description',
    link: 'https://www.google.com/',
    category: 'Main',
    type: 'Another type',
  },
]

export const WithMapMethod = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.HeadData>Название</Table.HeadData>
            <Table.HeadData align="center">Описание</Table.HeadData>
            <Table.HeadData>Ссылка</Table.HeadData>
            <Table.HeadData>Тип</Table.HeadData>
            <Table.HeadData>Вид</Table.HeadData>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(item => (
            <Table.Row key={item.id}>
              <Table.Data>{item.title}</Table.Data>
              <Table.Data>{item.description}</Table.Data>
              <Table.Data>{item.link}</Table.Data>
              <Table.Data>{item.category}</Table.Data>
              <Table.Data>{item.type}</Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
}
export const WithSort = {
  render: (args: any) => {
    const [sort, setSort] = useState<Sort>(null)
    const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null

    const columns: Column[] = [
      {
        key: 'title',
        title: 'Name',
        sortable: true,
      },
      {
        key: 'cardsCount',
        title: 'Cards',
        sortable: true,
      },
      {
        key: 'updated',
        title: 'Last Updated',
      },
      {
        key: 'createdBy',
        title: 'Created by',
        sortable: true,
      },
      {
        key: 'options',
        title: '',
      },
    ]
    const data1 = [
      {
        title: 'Project A',
        cardsCount: 10,
        updated: '2023-07-07',
        createdBy: 'John Doe',
      },
      {
        title: 'Project B',
        cardsCount: 5,
        updated: '2023-07-06',
        createdBy: 'Jane Smith',
      },
      {
        title: 'Project C',
        cardsCount: 8,
        updated: '2023-07-05',
        createdBy: 'Alice Johnson',
      },
      {
        title: 'Project D',
        cardsCount: 3,
        updated: '2023-07-07',
        createdBy: 'Bob Anderson',
      },
      {
        title: 'Project E',
        cardsCount: 12,
        updated: '2023-07-04',
        createdBy: 'Emma Davis',
      },
    ]
    const sortedData = useMemo(() => {
      if (!sortString) {
        return data1
      }
      const [key, direction] = sortString.split('-')

      return [...data1].sort((a, b) => {
        if (direction === 'asc') {
          return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
        }

        return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
      })
    }, [sortString])

    return (
      <Table.Root {...args} style={{ width: '100%' }}>
        <Table.SortedHeader columns={columns} onSort={setSort} sort={sort} />
        <Table.Body>
          {sortedData.map(item => (
            <Table.Row key={item.title}>
              <Table.Data>{item.title}</Table.Data>
              <Table.Data>{item.cardsCount}</Table.Data>
              <Table.Data>{item.updated}</Table.Data>
              <Table.Data>{item.createdBy}</Table.Data>
              <Table.Data>icons...</Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  },
}

export const Empty = {
  render: () => <Table.Empty />,
}
