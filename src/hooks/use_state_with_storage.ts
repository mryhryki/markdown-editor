import { useState } from 'react'

export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  const [value, _setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValue = (nextValue: string): void => {
    _setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  return [value, setValue]
}
