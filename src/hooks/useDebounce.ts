import { useState, useEffect } from 'react'

import { useAppSelector } from '@/hooks/hooks'

function useDebounceFunction<T>(value: T, delay?: number): T {
  const [state, setState] = useState<T>(value)

  useEffect(() => {
    const timerId = setTimeout(() => setState(value), delay || 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return state
}

export const useDebounce = () => {
  const { maxCardsCount, minCardsCount } = useAppSelector(state => state.decks.cardsCount)

  const [cardsCount, setCardsCount] = useState<number[]>([minCardsCount, maxCardsCount])

  const cardsCountSettings = useDebounceFunction(cardsCount)

  const resetSlider = () => {
    setCardsCount([minCardsCount, maxCardsCount])
  }

  return {
    cardsCount,
    cardsCountSettings,
    resetSlider,
    setCardsCount,
  }
}
