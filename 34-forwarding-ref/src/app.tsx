import { type FormEvent, useRef, version } from 'react'
import { Send } from 'lucide-react'
import { LearnSection } from '@/components'
import EmailInput from './components/form/email-input'
import EmailInputHOC from './components/form/email-input-hoc'
import EmailInputRefForward from './components/form/email-input-remind'

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // 브라우저 기본 작동 방지
    e.preventDefault()

    // <form> 요소
    const form = e.currentTarget

    // 입력된 이메일 값 출력
    console.log(inputRef.current?.value)

    // 폼 초기화
    form.reset()
  }

  return (
    <LearnSection
      title="참조 객체 전달하기 (Forwarding Ref Object)"
      className="p-10"
    >
      <h2 className="text-3xl font-extrabold">
        리액트 {version} 버전으로 렌더링
      </h2>

      <form noValidate onSubmit={handleSubmit} className="flex gap-1">
        {/* 하위 커스텀 컴포넌트에 ref 전달하기 (React 18 실패 ❌) */}
        {/* 리액트가 말하길, React.forwoarRef 고차 컴포넌트를 사용해야된다 */}
        {/* 하위 커스텀 컴포넌트에 ref 전달하기 (React 19 성공 ✅) */}
        {/* 리액트 19버전부터 ref는 속성(props)으로 처리됨 */}
        <EmailInput ref={inputRef} />
        {/* <EmailInputHOC ref={inputRef} /> */}
        {/* <EmailInputRefForward ref={inputRef} /> */}
        <button type="submit" className="button flex gap-1 items-center">
          <Send
            size={16}
            ref={(elem) => {
              console.log(elem)
            }}
          />{' '}
          제출
        </button>
      </form>
    </LearnSection>
  )
}
// --------------------------------------------------------
// tes
// ;() => {
//   function App() {
//     const inputRef = useRef<HTMLInputElement>(null)
//   }

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const form = e.currentTarget

//     console.log(inputRef.current?.value)

//     form.reset()
//   }

//   return (
//     <LearnSection
//       title="참조 객체 전달하기 (forwarding ref object)"
//       className="p-10"
//     >
//       <h2 className="대충 스타일링">리액트 {version} 버전으로 렌더링</h2>
//       <form noValidate onSubmit={handleSubmit} className="대충 스타일링">
//         {/* 리액트 18버전에선 하위 커스텀 컴포넌트엔 ref로 전달할 수 없고 forwardRef로 전달해야 된다 */}
//         {/* 리액트 19버전에선 ref로 하위 커스텀 컴포넌트에 ref로 속성을 전달할 수 있다 */}
//         <EmailInput ref={inputRef} />
//         <EmailInputHOC ref={inputRef} />
//         <EmailInputRefForward ref={inputRef} />
//         <button type="submit">제출</button>
//       </form>
//     </LearnSection>
//   )
// }
