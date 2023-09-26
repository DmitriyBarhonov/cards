export type Sort = {
  key: string //ключ для сортировки
  direction: 'asc' | 'desc' //по возрастанию или убыванию
} | null //сортировки может не быть вовсе

export type Column = {
  key: string //инфа о столбце таблицы, ключ по которому будет поиск
  title: string //название столбца
  sortable?: boolean
}
