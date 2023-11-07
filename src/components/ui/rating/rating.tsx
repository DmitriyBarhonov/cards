import { FC } from 'react'

import { Star } from './star'

export const Rating: FC<{ rating: number }> = ({ rating }) => {
  let itemCount = [1, 2, 3, 4, 5]

  return (
    <div style={{ display: 'flex' }}>
      {itemCount.map((item, index) => {
        return <Star selected={rating >= item} key={index} />
      })}
    </div>
  )
}
