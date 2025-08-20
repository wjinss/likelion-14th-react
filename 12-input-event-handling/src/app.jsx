import { useState } from 'react'
import { LearnSection } from '@/components'
import ChangeLikeInput from './components/change-like-input'

export default function App() {
  const [name, setName] = useState('정우진')
  return (
    <LearnSection className="m-5" title="랜덤 카운트 업">
      <h2 className="text-2xl mb-4">리액트의 온체인지 이벤트 인풋</h2>
      <div className="mb-5 flex items-center gap-2">
        <label htmlFor="user-name">이름</label>
        <input
          className="border-2 border-indigo-600 text-indigo-700 px-1 py-0.5"
          type="text"
          id="user-name"
          name="user-name"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
        {/* 리액트의 온체인지 이벤트는 html의 체인지이벤트처럼 작동하지 않는다. */}
        {/* 네이티브 이벤트 인풋으로 작동 */}
      </div>
      <h2 className='text-2xl mb-4"'>
        웹 표준 체인지 이벤트처럼 작동하는 인풋
      </h2>
      <div className="mb-5 flex items-center gap-2">
        <label htmlFor="user-name2">이름</label>
        <ChangeLikeInput
          type="text"
          id="user-name2"
          className="border-2 border-indigo-600 text-indigo-700 px-1 py-0.5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <output>{name}</output>
    </LearnSection>
  )
}
