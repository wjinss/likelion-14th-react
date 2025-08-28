import { useState } from 'react'
import { useImmer } from 'use-immer'

// ---------------------------------------------------------------------------------
// ✅ 구현 요구 사항
// ---------------------------------------------------------------------------------
// - [x] 하나의 App 파일에서 아래 요구사항을 모두 구현해보세요.
// - [x] 인풋에 할 일을 입력하고, 추가 버튼을 클릭하면 할 일이 목록에 추가되어야 합니다.
// - [x] 각 할 일마다 체크박스(또는 레이블)을 클릭하면 해당 할 일이 완료된 것으로 표시되어야 합니다.
// - [ ] 각 할 일 옆에 삭제 버튼을 만들어, 삭제 버튼을 클릭하면 해당 할 일이 목록에서 삭제되어야 합니다.
// ---------------------------------------------------------------------------------

export default function SimpleTodoList() {
  // 새로운 할 일 상태 관리
  const [doit, setDoit] = useState('')
  const handleChange = (e) => setDoit(e.target.value)

  // 할 일 목록 관리
  const [todoList, setTodoList] = useImmer([
    { id: crypto.randomUUID(), doit: '보육원에 가서 점심 사주기', done: false },
  ])

  // 할 일 추가
  const handleAddTodo = (e) => {
    e.preventDefault()

    // 사용자 입력 값 검증
    if (doit.trim().length === 0) {
      console.warn('새로운 할 일을 입력해야 합니다.')
      return
    }

    // 새 할일 정의
    const newTodo = {
      id: crypto.randomUUID(),
      done: false,
      doit,
    }

    // 새 할일을 할 일 목록의 맨 앞에 추가

    // Immer 라이브러리 사용법
    // setTodoList((draft) => {
    //   draft.push(newTodo)
    // })

    // useState 상태 업데이트와 동일한 방법
    setTodoList([...todoList, newTodo])

    // 새로운 할 일 상태 초기화
    setDoit('')
  }

  // 할 일 수정
  const handleUpdateTodo = (id) => {
    // 리액트의 방식 (불변성 유지)
    // setTodoList(
    //   todoList.map((todo) => {
    //     if (todo.id === id) return { ...todo, done: !todo.done }
    //     return todo
    //   })
    // )

    // 자바스크립트의 방식 (draft를 사용한 변형)
    setTodoList((draft) => {
      const editTodo = draft.find((item) => item.id === id)
      if (editTodo) editTodo.done = !editTodo.done
      return draft
    })
  }

  // 할 일 삭제
  const handleDeleteTodo = (id) => {
    // 리액트의 방식 (불변성 유지)
    // setTodoList(todoList.filter((todo) => todo.id !== id))

    // 자바스크립트의 방식 (draft를 사용한 변형)
    // 배열의 특정 인덱스 순서의 원소를 삭제하려면?
    // 어떤 메서드를 사용하면 좋을까요? findIndex, splice
    setTodoList((draft) => {
      const deleteIndex = draft.findIndex((item) => item.id === id)
      if (deleteIndex > -1) draft.splice(deleteIndex, 1)
    })
  }

  // 파생된 상태 설정
  // 할 일 목록을 역순으로 정렬
  const reversedTodoList = todoList.toReversed()

  return (
    <div className="container">
      <section>
        <h2 className="sr-only">할 일 추가</h2>
        <form className="new-todo-form" onSubmit={handleAddTodo}>
          <div role="group" className="form-control grow">
            <label htmlFor="todo-input">새로운 할 일</label>
            <input
              type="text"
              id="todo-input"
              value={doit}
              onChange={handleChange}
            />
          </div>
          <button className="button" type="submit">
            추가
          </button>
        </form>
      </section>
      <section>
        <h2 className="sr-only">할 일 목록</h2>
        <ul className="todo-list">
          {reversedTodoList.map(({ id, doit, done }) => {
            return (
              <li key={id} className="list-item">
                <div className="form-control row">
                  <input
                    id={id}
                    type="checkbox"
                    checked={done}
                    onChange={handleUpdateTodo.bind(null, id)}
                    // onChange={() => handleUpdateTodo(id)}
                  />
                  <label htmlFor={id} className="list-item-label">
                    {doit}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteTodo.bind(null, id)}
                  // onClick={() => handleDeleteTodo(id)}
                >
                  삭제
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
