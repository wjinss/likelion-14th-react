import { type ChangeEvent, useState } from 'react'

export default function useInput<Type = string>(initialValue: Type) {
  const [value, setValue] = useState<Type>(initialValue)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as Type)
  }

  return { value, onChange }
}
