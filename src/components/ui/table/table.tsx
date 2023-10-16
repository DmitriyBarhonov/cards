import { ComponentProps, ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

import { SortDown } from '@/assets/icons/down.tsx'
import { SortUp } from '@/assets/icons/up.tsx'
import { Typography } from '@/components/ui'
import { Column, Sort } from '@/services/types'

//везде будет одинаковая конструкция ComponentProps<'тег таблицы'>, то есть кастомный компонент будет принимать пропсы такие же, как и тег таблицы
//будут представлены все компоненты table, thead, tbody, th, tr, td
export const Root: FC<ComponentProps<'table'>> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} /> //возвращаем сам тег таблицы, столизуем и отдаем остальные пропсы
}
export const Head: FC<ComponentProps<'thead'>> = props => {
  return <thead {...props} />
}
export const HeadData: FC<ComponentProps<'th'>> = props => {
  return <th className={s.head} {...props} />
}
export const Body: FC<ComponentProps<'tbody'>> = props => {
  return <tbody {...props} />
}
export const Row: FC<ComponentProps<'tr'>> = props => {
  return <tr className={s.row} {...props} />
}
export const Data: FC<ComponentProps<'td'>> = ({ className, ...rest }) => {
  const classNames = {
    data: clsx(className, s.data),
  } // в последем ряду будут разные стили,но базовые стилилтаблицы сохраняться

  return <td className={classNames.data} {...rest} />
}

//кастомный заголовкок если используем сортировку

//header для сортировки по столбцам
export const SortedHeader: FC<
  Omit<
    ComponentPropsWithoutRef<'thead'> & {
      //стандартные типы для thead и типы для сортировки
      columns: Column[] //массив значений для столбцов, ключ, имя, будет ли сортировка
      sort?: Sort //инфо о текущей сотрировке
      onSort?: (sort: Sort | null) => void //функция для сортировки
    },
    'children'
  >
> = ({ columns, sort, onSort, ...restProps }) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    // вызывается при клике на столбец
    // Если в таблице не нужна сортировка, то есть не передали onSort и sortable, то обрываем обработку
    // Если текущая сортировка не по данному столбцу (sort.key !== key), то вызывается функция onSort с направлением сортировки 'asc'.
    // Если текущее направление сортировки - 'desc', то вызывается функция onSort с null (отмена сортировки).
    // В остальных случаях меняется направление сортировки и вызывается функция onSort с новой информацией о сортировке.
    if (!onSort || !sortable) return

    if (sort?.key !== key) {
      // Начинаем сортировку заново при первом клике
      return onSort({ key, direction: 'asc' })
    } else if (sort.direction === 'asc') {
      // Меняем направление сортировки при втором клике
      return onSort({ key, direction: 'desc' })
    } else {
      // Сбрасываем сортировку при третьем клике
      return onSort(null)
    }
  }

  return (
    //Для каждого столбца из массива columns создается <th> (заголовок столбца) с обработчиком щелчка onClick,
    // который вызывает handleSort с ключом столбца и информацией о его сортировке
    <thead {...restProps}>
      <tr>
        {columns.map(({ title, key, sortable }) => (
          <th className={s.head} key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && (
              <span className={s.sort}>{sort.direction === 'asc' ? <SortUp /> : <SortDown />}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}
export const Empty: FC<ComponentProps<'div'>> = ({ className }) => {
  const classNames = {
    empty: clsx(className, s.empty),
  }

  return (
    <Typography variant={'h2'} className={classNames.empty}>
      You see an empty table, there is no data yet
    </Typography>
  )
}
export const Table = {
  Root,
  Head,
  SortedHeader,
  Body,
  Row,
  HeadData,
  Data,
  Empty,
}
// стандартная констурция
// table, thead, tr, th, tbody, td
// <table> тег таблицы
//   <thead> голова таблицы в котором используем tr как описание столбцов
//   <tr> ниже все описания завернутые в загловки
//     <th>Name</th> table header - заголовки столбцов
//     <th>Cards</th>
//     <th>Last Updated</th>
//     <th>Created by</th>
//   </tr>
//   </thead>
//   <tbody> тело таблицы
//   {decks.data?.items?.map((deck: any) => {
//     return (
//         <tr key={deck.id}> ряд в таблице, где td это ячейка, кол-во ячеек равно кол-ву столбцов
//           <td>{deck.name}</td> table data
//           <td>{deck.cardsCount}</td>
//           <td>{new Date(deck.updated).toLocaleDateString('ru-Ru')}</td>
//           <td>{deck.author.name}</td>
//         </tr>
//     )
//   })}
//   </tbody>
// </table>
