import { FC } from 'react'

import * as AvatarRadix from '@radix-ui/react-avatar'

import s from './avatar.module.scss'

type AvatarProps = {
  /**
   * Show the image if it is
   */
  avatar?: string
  /**
   * If there is no image show initials
   */
  name: string
  className?: string
}
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
}

export const Avatar: FC<AvatarProps> = ({ avatar, name, className }) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <AvatarRadix.Root className={`${className} ${s.AvatarRoot}`}>
      <AvatarRadix.Image className="AvatarImage" src={avatar} alt={name} />
      <AvatarRadix.Fallback className={s.AvatarFallback}>{getInitials(name)}</AvatarRadix.Fallback>
    </AvatarRadix.Root>
  </div>
)
