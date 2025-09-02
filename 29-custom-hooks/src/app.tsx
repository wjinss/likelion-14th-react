import { useCallback, useState } from 'react'
import { LearnSection } from '@/components'
import { useInput, useToggleState } from '@/hooks'
import { tw } from './utils'

export default function App() {
  const inputProps = useInput<number>(99)

  const [darkTheme, toggleDarkTheme] = useToggleState(true)

  // toggleDarkTheme 현재 렌더링에서와 다음 렌더링에서 동일한 함수이다. ✅ ❌

  const themeClassNames = darkTheme ? 'bg-slate-950 text-white' : ''
  const checkeboxLabel = darkTheme ? '라이트 테마 전환' : '다크 테마 전환'

  return (
    <LearnSection
      title="사용자 정의 훅 (Custom Hooks)"
      showTitle
      className={tw('p-10 h-screen', themeClassNames)}
    >
      <div role="group" className="flex gap-1 items-center">
        <input
          type="checkbox"
          id="theme-checkbox"
          checked={darkTheme}
          onChange={toggleDarkTheme}
        />
        <label htmlFor="theme-checkbox" className="select-none">
          {checkeboxLabel}
        </label>
      </div>
      <div role="group" className="flex flex-col gap-2 my-4">
        <label htmlFor="number-input">숫자</label>
        <input
          type="number"
          id="number-input"
          className="my-2"
          min={0}
          max={10}
          {...inputProps}
        />
      </div>
      <output>{inputProps.value}</output>
      <CustomHookDemo />
    </LearnSection>
  )
}

function CustomHookDemo() {
  const inputProps = useInput<string>('reusable logic')

  const [toggle, setToggle] = useToggleState(true)
  const language = toggle ? 'ko' : 'en'
  const isKorean = language.includes('ko')

  return (
    <>
      <div role="group" className="flex flex-col gap-2 my-4">
        <label htmlFor="user-input">이름</label>
        <input type="text" id="user-input" className="my-2" {...inputProps} />
        <output>{inputProps.value || '이름 값 출력'}</output>
      </div>
      <button
        type="button"
        className="select-none cursor-pointer bg-black text-white p-2"
        lang={isKorean ? 'en' : 'ko'}
        onClick={setToggle}
      >
        {isKorean ? 'change english' : '한국어 전환'}
      </button>
    </>
  )
}

function Parent() {
  const [count, setCount] = useState(0)
  const update = useCallback(
    function () {
      // setCount(count + 1)
      setCount((c) => c + 1)
    },
    // [count]
    []
  )

  // useEffect(() => {
  //   update()
  // }, [update])

  return <Child count={count} update={update} />
}

interface ChildProps {
  count: number
  update: () => void
}

function Child({ count, update }: ChildProps) {
  return (
    <div className="p-12">
      <button type="button" className="text-xl" onClick={update}>
        {count}
      </button>
    </div>
  )
}
