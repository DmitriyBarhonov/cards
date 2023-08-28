type PropsType = {
  className: string
  arrowColor?: string
  bgColor?: string
}
export const Check = (props: PropsType) => {
  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="4" y="6" width="16" height="12" fill={props.arrowColor} />
      <path
        d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        fill={props.bgColor}
      />
    </svg>
  )
}
// @mixin checkbox-styling($background-color, $border-color) {
//   width: 20px;
//   height: 20px;
//   background-color: $background-color;
//   border: 2px solid $border-color;
//   border-radius: 2px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 8px;
//   position: relative;
//   z-index: 222;
// }
// @mixin label-styling($color) {
//   display: flex;
//   align-items: center;
//   color: $color;
//   cursor: pointer;
// }
// @mixin pseudo-element-styling($background-color) {
//   content: '';
//   position: absolute;
//   width: 38px;
//   height: 38px;
//   border-radius: 50%;
//   background-color: $background-color;
//   opacity: 0.5;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1;
// }

// .checkboxRoot {
//   @include checkbox-styling(#00000000, #ffffff);
//   &:hover {
//     border-color: #808080;

//     &::before {
//       @include pseudo-element-styling(#808080);
//     }
//   }
//   &:focus {
//     outline: none;
//     &::before {
//       @include pseudo-element-styling(#c3c1c7);
//     }
//   }
// }

// .disabledCheckboxRoot {
//   @include checkbox-styling(#dcdae000, #DCDAE0);
// }

// .w {
//   margin: 20px;
// }
// .label {
//   display: flex;
//   align-items: center;
//   color: var(--light-100, #fff);
//   cursor: pointer;
// }
// .icon {
//   position: relative;
//   z-index: 10;
//   display: flex;
// }
/* width: 36px;  #DCDAE0*/
/* height: 36px; */
/* background: aqua; */
/* border-radius: 50%; */
/* display: flex; */
/* align-items: center; */
/* justify-content: center; */
