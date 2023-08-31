import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './card.module.scss'

export type CardProps = {} & ComponentPropsWithoutRef<'div'>
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  return <div ref={ref} className={`${s.card} ${className}`} {...restProps}></div>
})
//forwardRef оборачиваем фунцию для того чтобы испольтзовать реф в детях
//чтобы у компоненты были все типы обычного дива прикрепляем HTMLDivElement
