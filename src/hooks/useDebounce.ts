import { useState, useEffect } from 'react'

import { useAppSelector } from '@/hooks/hooks'
import { useGetDecksQuery } from '@/services/decks'

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
  const { currentData: decks } = useGetDecksQuery()
  const { maxCardsCount, minCardsCount } = useAppSelector(state => state.decks.cardsCount)

  const [cardsCount, setCardsCount] = useState<number[]>([minCardsCount, maxCardsCount])

  const cardsCountSettings = useDebounceFunction(cardsCount)

  useEffect(() => {
    debugger
    setCardsCount([cardsCount[0], decks?.maxCardsCount ? decks?.maxCardsCount : cardsCount[1]])
  }, [])

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
