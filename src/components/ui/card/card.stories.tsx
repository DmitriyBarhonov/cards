import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

import { Typography } from '@/components/ui'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <Typography variant={'body1'}>
        {' '}
        forwardRef - это функция в React, которая позволяет передать ref (ссылку) через компоненты.
        Представьте, что у вас есть компонент A, который оборачивает компонент B, и вы хотите
        использовать ref на компонент B, который применен внутри компонента A. Используя forwardRef,
        вы можете передать ref из компонента A в компонент B. Примерно так: компонент A передает
        ссылку в компонент B через forwardRef, и компонент B может использовать эту ссылку для
        доступа к своему реальному DOM-элементу. Интерфейс HTMLDivElement полезен для работы с
        элементами div на странице, изменения их стилей, добавления и удаления содержимого, а также
        управления событиями и дополнительными атрибутами.
      </Typography>
    ),
    style: {
      width: '650px',
      height: '500px',
    },
  },
}
