import { type PropsWithChildren, forwardRef, useId } from 'react'

type Props = PropsWithChildren<{
  label?: string
}>

// 커스텀 컴포넌트인데 forwardRef 고차 컴포넌트가 함께인..
// - 고차 컴포넌트 forwardref(함수 컴포넌트) => 향상된 컴포넌트 반환
// - 컴포넌트(props, ref)두 번째 인수로 ref 객체를 전달 받음
const EmailInputHOC = forwardRef<HTMLInputElement, Props>(
  function EmailInput(props, ref) {
    const inputId = useId()

    return (
      <div role="group" className="flex gap-1 items-center">
        <label htmlFor={inputId} className="sr-only">
          {props.label ?? '이메일'}
        </label>
        {/* HTML 컴포넌트에 ref 전달 */}
        <input
          ref={ref}
          id={inputId}
          type="email"
          name="email"
          className="p-2"
        />
      </div>
    )
  }
)

export default EmailInputHOC

// -----------------------------------------------------------------------
{
  type Props = PropsWithChildren<{
    label?: string
  }>

  const EmailInputHOC = forwardRef<HTMLInputElement, Props>(
    function EmailInput(props, ref) {
      const inputId = useId()

      return (
        <div role="group" className="대충 스타일링">
          <label htmlFor={inputId}>{props.label ?? '이메일'}</label>
          <input type="email" ref={ref} id={inputId} />
        </div>
      )
    }
  )
}

// 커스텀 컴포넌트에 forwardRef 고차 컴포넌트와 함께
// 고차 컴포넌트 forwardRef(함수 컴포넌트) > 향상된 컴포넌트를 반환
// 컴포넌트 두 번째 인수로 ref 객체를 전달받음
