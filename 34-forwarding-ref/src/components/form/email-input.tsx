import { type RefObject, useId } from 'react'

interface Props {
  ref: RefObject<HTMLInputElement | null>
  label?: string
}

export default function EmailInput({ ref, label }: Props) {
  const inputId = useId()

  return (
    <div role="group" className="flex gap-1 items-center">
      <label htmlFor={inputId} className="sr-only">
        {label ?? '이메일'}
      </label>
      {/* HTML 컴포넌트에 ref 전달 */}
      <input ref={ref} id={inputId} type="email" name="email" className="p-2" />
    </div>
  )
}

// -------------------------------------------
{
  interface Props {
    ref: RefObject<HTMLInputElement | null>
    label?: string
  }

  function EmailInputTest({ ref, label }: Props) {
    const inputId = useId()

    return (
      <div role="group" className="대충 스타일링">
        <label htmlFor={inputId} className="sr-only">
          {label ?? '이메일'}
          <input type="email" ref={ref} id={inputId} />
        </label>
      </div>
    )
  }
}
