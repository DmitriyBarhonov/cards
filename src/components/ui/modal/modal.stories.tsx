import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './index.ts'

import { Button, Checkbox, Input, Select } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const AddNewDeck: Story = {
  args: {
    children: (
      <>
        <Input
          className={'fWidth'}
          variant={'standard'}
          placeholder={'Name'}
          label={'New pack name'}
          name={'newPackTitle'}
        />
        <div className={'my-8'}>
          <Checkbox label={'Private pack'} />
        </div>

        <div className={'flex justify-between'}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button>Add Deck</Button>
        </div>
      </>
    ),
    open: true,
    modalTitleVariant: 'default',
    modalMainTitle: 'Add New Deck',
  },
}

const questionTypeOptions = [
  {
    value: 'text',
    label: 'Text',
  },
  {
    value: 'image',
    label: 'Image',
  },
  {
    value: 'video',
    label: 'Video',
  },
]

export const AddNewCard: Story = {
  args: {
    children: (
      <>
        <div className={'mt-6'}>
          <Select
            label={'Chose question format'}
            width={398}
            placeholder={'Text'}
            options={questionTypeOptions}
            onChange={() => {}}
            value={'Text'}
          ></Select>
        </div>
        <div className={'mt-6'}>
          <Input
            className={'fWidth'}
            variant={'standard'}
            placeholder={'Type in the question'}
            label={'Question'}
            name={'newCardTitle'}
          />
        </div>
        <div className={'mt-8'}>
          <Input
            className={'fWidth'}
            variant={'standard'}
            placeholder={'Type in the proper answer'}
            label={'Answer'}
            name={'newCardTitle'}
          />
        </div>
        <div className={'flex justify-between mt-12 mb-4'}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button>Add Card</Button>
        </div>
        {/*<Button fullWidthForModal={true}>Add a new card</Button>*/}
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
        <div className={'flex justify-between'}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button>Add new pack</Button>
        </div>
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
        <div className={'flex justify-between'}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button>Add new pack</Button>
        </div>
      </>
    ),
  },
}
