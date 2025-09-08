import { forwardRef, useId } from 'react'

interface Props {
  label?: string
}

// 사용자 정의 컴포넌트 (Custom Component)
// - ref를 속성으로 취급하지 않음 (문제의 시작)
// - 기본적으로 컴포넌트는 ref를 속성으로 전달받지 않음
// - 만약 ref 속성을 전달받고자 한다면 React.forwardRef 함수 사용
// - 개발 도구에서 ForwardRef로 표기되어 ref 포워딩된 컴포넌트임을 식별

const EmailInputRefForward = forwardRef<HTMLInputElement, Props>(
  function EmailInput({ label }, ref) {
    const inputId = useId()

    return (
      <div role="group" className="flex gap-1 items-center">
        <label htmlFor={inputId} className="sr-only">
          {label ?? '이메일'}
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
// 기명함수가 아닌 화살표 함수로 컴포넌트에 forwardref를 사용하면 익명함수이기 때문에 displayName으로 이름을 부여
// EmailInputRefForward.displayName = 'EmailInput'

export default EmailInputRefForward
// -------------------------------------------

{
  interface Props {
    label?: string
  }
  const EmailInputRefForward = forwardRef<HTMLInputElement, Props>(
    function EmailInput({ label }, ref) {
      const inputId = useId()

      return (
        <div role="group">
          <label htmlFor={inputId}>{label ?? '이메일'}</label>
          <input type="email" name="" id={inputId} ref={ref} />
        </div>
      )
    }
  )
}
// 커스텀 컴포넌트는 ref를 속성으로 취급하지 않는다.
// 그래서 속성(props)로 전달받지 못한다.
// ref속성을 받고 싶으면 하위 컴포넌트에 React.forwardRef를 사용해 감싼다

// 이때 기명함수가 아닌 화살표 함수로 컴포넌트에 forwardRef로 감싸면 익명함수기 때문에 displayName으로 이름을 부여해야 한다
// EmailInputRefForward.displayName = 'EmailInput'
