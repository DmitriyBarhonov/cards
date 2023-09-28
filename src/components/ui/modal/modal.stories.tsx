import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './index.ts'

import { Button, Input } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Input
          className={'fWidth'}
          variant={'standard'}
          placeholder={'Type in the new card name'}
          label={'New card name'}
          name={'newCardTitle'}
        />
        <Input
          variant={'standard'}
          placeholder={'Type in the new card name'}
          label={'New card name'}
          name={'newCardTitle'}
        />
        <Button>Add a new card</Button>
      </>
    ),
    open: true,
    modalMainTitle: 'Ah shit, here we go again',
  },
}
export const LargeTitle: Story = {
  args: {
    open: true,
    children: (
      <>
        <Input
          className={'fWidth'}
          variant={'standard'}
          placeholder={'Type in the new card name'}
          label={'New card name'}
          name={'newCardTitle'}
        />
        <Input
          variant={'standard'}
          placeholder={'Type in the new card name'}
          label={'New card name'}
          name={'newCardTitle'}
        />
        <Button>Add a new card</Button>
      </>
    ),
    modalMainTitle: 'Ah shit, here we go again',
    modalTitleVariant: 'large',
  },
}
export const NoTitle: Story = {
  args: {
    open: true,
    children: (
      <>
        <Input
          variant={'standard'}
          placeholder={'Type in the new card name'}
          label={'New card name'}
          name={'newCardTitle'}
        />
        <Input
          variant={'standard'}
          placeholder={'Type in the new card name'}
          label={'New card name'}
          name={'newCardTitle'}
        />
        <Button className={'fWidth'}>Add a new card</Button>
      </>
    ),
  },
}
