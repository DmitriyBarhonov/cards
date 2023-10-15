import { Star } from './star'

export const Rating = (props: any) => {
  let a = []

  for (let i = 0; i < 5; i++) {
    a.push(i)
  }

  return (
    <>
      {a.map((item, index) => {
        return <Star selected={props.rating > item} key={index} />
      })}
    </>
  )
}
