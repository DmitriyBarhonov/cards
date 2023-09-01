import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationWithoutSelect: Story = {
  args: {
    totalCount: 300,
    currentPage: 1,
    pageSize: 10,
  },
}

export const PaginationWithSelect: Story = {
  args: {
    totalCount: 300,
    currentPage: 1,
    pageSize: 10,
    selectValue: 10,
    selectOptions: [10, 20, 30, 50, 100], //массив значений для выбора сколько вещей на странице
    onSelectChange: () => {},
  },
}
