import { type ChangeEvent, useState } from 'react'
import { LearnSection } from '@/components'
import { tw } from './utils'

export default function App() {
  // [1] 토글 상태
  // 테마(theme)
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  // 체크박스 기능: 테마 토글 (checkbox)
  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(e.target.checked)
  }

  const themeClassNames = darkTheme ? 'bg-slate-950 text-white' : ''
  const checkeboxLabel = darkTheme ? '라이트 테마 전환' : '다크 테마 전환'

  // [2] 인풋 상태
  const [num, setNum] = useState<number>(0)
  const handleChangeNum = (e: ChangeEvent<HTMLInputElement>) => {
    setNum(Number(e.target.value))
  }

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
          onChange={handleChecked}
        />
        <label htmlFor="theme-checkbox">{checkeboxLabel}</label>
      </div>
      <div role="group" className="flex flex-col gap-2 my-4">
        <label htmlFor="number-input">숫자</label>
        <input
          type="number"
          value={num}
          onChange={handleChangeNum}
          id="number-input"
          className="my-2"
          min={0}
          max={10}
        />
      </div>
      <output>{0}</output>
      <CustomHookDemo />
    </LearnSection>
  )
}

function CustomHookDemo() {
  // [관심사] 토글 상태 관리
  // 상태
  const [toggleState, setToggleState] = useState<boolean>(true)
  // 상태 업데이트
  const handleChangeLanguage = () => {
    setToggleState((t) => !t)
  }

  const language = toggleState ? 'ko' : 'en'
  const isKorean = language.includes('ko')

  // [관심사] 인풋 상태 관리
  // 상태
  const [name, setName] = useState<string>('')
  // 상태 업데이트
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  return (
    <>
      <div role="group" className="flex flex-col gap-2 my-4">
        <label htmlFor="user-input">이름</label>
        <input
          name={name}
          onChange={handleChange}
          type="text"
          id="user-input"
          className="my-2"
        />
        <output>{name || '이름 값 출력'}</output>
      </div>
      <button
        type="button"
        className="cursor-pointer bg-black text-white p-2"
        lang={isKorean ? 'en' : 'ko'}
        onClick={handleChangeLanguage}
      >
        {isKorean ? 'change english' : '한국어 전환'}
      </button>
    </>
  )
}
