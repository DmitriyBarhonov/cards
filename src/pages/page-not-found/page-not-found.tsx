import { useNavigate } from 'react-router-dom'

import s from './page-not-found.module.scss'

import { NotFound } from '@/assets/icons/404.tsx'
import { Button, Typography } from '@/components/ui'

export const PageNotFound = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // -1 означает перейти на предыдущую страницу
  }

  return (
    <div className={s.wrap}>
      <NotFound />
      <Typography>Sorry! Page not found!</Typography>
      <Button onClick={handleGoBack}>Back to home page</Button>
    </div>
  )
}
