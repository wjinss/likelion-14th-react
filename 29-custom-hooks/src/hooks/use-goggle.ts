import { useState } from 'react'

export default function useToggleState(initialValue: boolean = true) {
  const [toggle, setToggle] = useState<boolean>(initialValue)
  const update = () => setToggle((t) => !t)
  return [toggle, update] as const
}
