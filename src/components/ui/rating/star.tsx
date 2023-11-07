import { FC } from 'react'

import { EmptyStar, FullStar } from '@/assets/icons'

export const Star: FC<{ selected: boolean }> = ({ selected }) => {
  return selected ? <FullStar /> : <EmptyStar />
}
