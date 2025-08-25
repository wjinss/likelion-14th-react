import { useState } from 'react'
import './style.css'

const INITIAL_ARRAY_STATE = ['A', 'B', 'C']

export default function ManageArrayState() {
  const [arrayState, setArrayState] = useState(INITIAL_ARRAY_STATE)
  const maxValue = arrayState.length - 1

  const handleRemoveFirstItem = () => {
    if (arrayState.length === 0) return
    const [, ...nextArrayState] = arrayState
    setArrayState(nextArrayState)
  }

  const handleRemoveB = () => {
    const nextArrayState = arrayState.filter((item) => item !== 'B')
    setArrayState(nextArrayState)
  }

  const handleAddFirstX = () => {
    const nextArrayState = ['X', ...arrayState]
    setArrayState(nextArrayState)
  }

  const handleAddLastY = () => {
    const nextArrayState = [...arrayState, 'Y']
    setArrayState(nextArrayState)
  }

  const handleAllClear = () => {
    // const nextArrayState = []
    setArrayState([])
  }

  const handleReset = () => {
    setArrayState(INITIAL_ARRAY_STATE)
  }

  const handleChangeAtoH = () => {
    const nextArrayState = arrayState.map((item) => (item === 'A' ? 'H' : item))
    setArrayState(nextArrayState)
  }

  const [addValue, setAddValue] = useState('')

  const handleUpdateAddValue = (e) => {
    setAddValue(e.target.value)
  }

  const handleAddFirstValue = () => {
    setArrayState((as) => [addValue, ...as])
    setAddValue('')
  }

  const handleEnterKey = (e) => {
    if (addValue.trim().length === 0) return
    if (e.key === 'Enter') handleAddFirstValue()
  }

  const [insertValue, setInsertValue] = useState('')
  const [insertIndex, setInsertIndex] = useState(0)

  const handleInsertValueAtIndex = () => {
    const nextArrayState = [
      ...arrayState.slice(0, insertIndex),
      insertValue,
      ...arrayState.slice(insertIndex),
    ]

    setArrayState(nextArrayState)
    setInsertValue('')
    setInsertIndex(0)
  }

  return (
    <section className="manage-array-state">
      <h2>배열 상태 관리 실습</h2>

      <output>
        <strong>배열 상태</strong> : {arrayState.join(', ')}
        {/* 배열을 역순으로 호출 <strong>배열 상태</strong> : {arrayState.toReversed().join(', ')} */}
      </output>

      <div role="group">
        <button type="button" onClick={handleRemoveFirstItem}>
          첫 번째 요소 제거
        </button>
        <button type="button" onClick={handleRemoveB}>
          'B' 제거
        </button>
        <button type="button" onClick={handleAddFirstX}>
          맨 앞에 'X' 추가
        </button>
        <button type="button" onClick={handleAddLastY}>
          맨 뒤에 'Y' 추가
        </button>
        <button type="button" onClick={handleAllClear}>
          모두 제거
        </button>
        <button type="button" onClick={handleReset}>
          초기화
        </button>
        <button type="button" onClick={handleChangeAtoH}>
          모든 'A'를 'H'로 변경
        </button>
      </div>

      <div role="group" data-layout-row>
        <input
          type="text"
          placeholder="추가할 값"
          value={addValue}
          onInput={handleUpdateAddValue}
          onKeyDown={handleEnterKey}
        />
        <button type="button" onClick={handleAddFirstValue}>
          맨 앞에 추가
        </button>
      </div>

      <div role="group" data-layout-row>
        <input
          type="text"
          placeholder="추가할 값"
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="인덱스"
          min={0}
          max={maxValue}
          value={insertIndex}
          onInput={(e) => {
            const index = Number(e.target.value)
            setInsertIndex(index)
          }}
        />
        <button type="button" onClick={handleInsertValueAtIndex}>
          원하는 위치에 추가
        </button>
      </div>
    </section>
  )
}

// 배열 메서드 관리 연습
;() => {
  function ManageArrayState() {
    const INITIAL_ARRAY_STATE = ['A', 'B', 'C']
    // 1. 초깃값이 `['A', 'B', 'C']`인 배열을 상태로 생성합니다.
    const [arrayState, setArrayState] = useState(INITIAL_ARRAY_STATE)
    const maxValue = arrayState.length - 1
    // 2. 배열의 첫 번째 요소를 제거할 수 있는 기능을 추가합니다.
    const handleRemoveFirstItem = () => {
      const [, ...nextArrayState] = arrayState
      setArrayState(nextArrayState)
      //첫 번째 배열의 아이템을 비워두고 그 외에 나머지 아이템은 따로 반환(nextArrayState)하고 그걸 새 상태로 지정한다
    }
    // 3. 배열에서 특정 문자를 제거할 수 있는 기능을 추가합니다.("A")
    const handleRemoveA = () => {
      const nextArrayState = arrayState.filter((item) => item !== 'A')
      setArrayState(nextArrayState)
      // 배열의 아이템에서 "A"인 요소를 뺀 배열을 새로 반환하고 그걸 새 상태로 지정한다
    }
    // 4. 배열의 맨 앞에 새로운 요소를 추가할 수 있는 기능을 추가합니다.
    const handleAddFirstItem = () => {
      const nextArrayState = ['X', ...arrayState]
      setArrayState(nextArrayState)
      // 배열의 맨 앞에 X를 넣고 그 뒤에 기존 배열을 넣어서 새 배열을 반환한다. 그리고 그걸 새 상태로 지정한다.
    }

    // 5. 배열의 맨 뒤에 새로운 요소를 추가할 수 있는 기능을 추가합니다.
    const handleAddLastItem = () => {
      const nextArrayState = [...arrayState, 'Y']
      setArrayState(nextArrayState)
      // 배열의 맨 뒤에 Y를 넣고 그 뒤에 기존 배열을 넣어서 새 배열을 반환한다. 그리고 그걸 새 상태로 지정한다.
    }
    // 6. 배열의 모든 요소를 제거하는 기능을 추가합니다.
    const handelRemoveAll = () => {
      setArrayState([]) //배열의 상태를 빈 배열로 만든다
    }
    // 7. 배열을 초깃값으로 되돌릴 수 있는 기능을 추가합니다.
    const handelArrayResat = () => {
      setArrayState(INITIAL_ARRAY_STATE) // 새 상태를 기존 배열로 변경한다
    }

    // 8. 배열에 있는 모든 `A` 요소를 `H`로 변경할 수 있는 기능을 추가합니다.
    const handleChangeAtoZ = () => {
      const nextArrayState = arrayState.map((item) =>
        item === 'A' ? 'Z' : item
      )
      setArrayState(nextArrayState)
    }

    // 9. 상태를 가지는 인풋과 버튼을 만든 후, 입력 값을 배열의 맨 앞에 추가할 수 있게 합니다.
    const [addValue, setAddValue] = useState('') // 인풋의 값을 상태로 지정한다.
    const handleUpdateAddValue = (e) => {
      setAddValue(e.target.value) // 인풋에 입력되는 값을 인풋의 상태로 저장한디.
    }

    const handleAddFirstValue = () => {
      setArrayState((addState) => [addValue, ...addState]) // 새롭게 인풋에 저장된 상태를 기존 상태의 앞에 추가한다.
      setAddValue('') // 인풋의 값을 초기화한다.
    }

    const handleEnterKey = (e) => {
      if (addValue.trim().length === 0) return // 인풋의 값이 없으면 험수 종료
      if (e.key === 'Enter') handleAddFirstValue() // 키가 엔터일때 클릭이벤트 실행
    }
    // 10. 배열의 원하는 인덱스에 새로운 요소를 추가할 수 있는 기능을 추가합니다.
    const [insertValue, setInsertValue] = useState('')
    const [insertIndex, setInsertIndex] = useState(0)

    const handleInsertValueAtIndex = () => {
      const nextArrayState = [
        ...arrayState.slice(0, insertIndex), // 기존 배열의 0부터 입력된 인덱스 전까지 잘라서 추가된 값의 앞에 위치.
        insertValue, // 인풋에 입력된 값을 상태에 저장
        ...arrayState.slice(insertIndex), // 기존 배열에 입력된 인덱스만큼 잘라서 추가된 값의 뒤에 위치
      ]

      setArrayState(nextArrayState) // 변경된 배열(상태)를 새로운 상태로 지정
      setInsertValue(' ') // 인풋 값 초기화
      setInsertIndex(0) // 인풋 값 초기화
    }
    return (
      <section className="manage-array-state">
        <h2>배열 상태 관리 실습</h2>

        <output>
          <strong>배열 상태</strong> : {arrayState.join(', ')}
          {/* 배열을 역순으로 호출 <strong>배열 상태</strong> : {arrayState.toReversed().join(', ')} */}
        </output>

        <div role="group">
          <button type="button" onClick={handleRemoveFirstItem}>
            첫 번째 요소 제거
          </button>
          <button type="button" onClick={handleRemoveA}>
            'B' 제거
          </button>
          <button type="button" onClick={handleAddFirstItem}>
            맨 앞에 'X' 추가
          </button>
          <button type="button" onClick={handleAddLastItem}>
            맨 뒤에 'Y' 추가
          </button>
          <button type="button" onClick={handelRemoveAll}>
            모두 제거
          </button>
          <button type="button" onClick={handelArrayResat}>
            초기화
          </button>
          <button type="button" onClick={handleChangeAtoZ}>
            모든 'A'를 'Z'로 변경
          </button>
        </div>

        <div role="group" data-layout-row>
          <input
            type="text"
            placeholder="추가할 값"
            value={addValue} // 인풋의 값을 addValue로 지정
            onInput={handleUpdateAddValue}
            onKeyDown={handleEnterKey}
          />
          <button type="button" onClick={handleAddFirstValue}>
            맨 앞에 추가
          </button>
        </div>

        <div role="group" data-layout-row>
          <input
            type="text"
            placeholder="추가할 값"
            value={insertValue} // 추가할 값을 상태로 지정
            onChange={(e) => setInsertValue(e.target.value)} // 인풋의 값이 변경되면 상태도 변경
          />
          <input
            type="number"
            placeholder="인덱스"
            min={0} // 최소값 지정
            max={maxValue} // 최대값 지정
            value={insertIndex} // 인풋의 값은 insertIndex로 상태 지정
            onInput={(e) => {
              const index = Number(e.target.value) // 인풋에 입력된 값을 숫자로 변경하고 index로 지정
              setInsertIndex(index) //설정된 인풋의 값(상태)를 변경
            }}
          />
          <button type="button" onClick={handleInsertValueAtIndex}>
            원하는 위치에 추가
          </button>
        </div>
      </section>
    )
  }
}
