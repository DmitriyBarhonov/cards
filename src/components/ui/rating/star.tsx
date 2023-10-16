import { EmptyStar } from '@/assets/icons/rating-icon/empty-star'
import { FullStar } from '@/assets/icons/rating-icon/full-star'

export const Star: React.FC<{ selected: boolean }> = ({ selected }) => {
  return selected ? <FullStar /> : <EmptyStar />
}
