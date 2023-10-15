export const Star = (props: any) => {
  return props.selected ? (
    <span>1</span>
  ) : (
    <span>
      <b>0</b>
    </span>
  )
}
