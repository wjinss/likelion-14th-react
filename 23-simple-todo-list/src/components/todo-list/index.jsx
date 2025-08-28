import { useState } from 'react'
import { useImmer } from 'use-immer'

export default function SimpleTodoList() {
  const [doit, newDoit] = useState('')
  const handleChange = (e) => newDoit(e.target.value)

  const [list] = useImmer([
    { id: crypto.randomUUID(), doit: '보육원에 가서 점심 사주기', done: false },
  ])

  return (
    <div className="container">
      <section>
        <h2 className="sr-only">할 일 추가</h2>
        <form className="new-todo-form">
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
          {list.map(({ id, doit, done }) => {
            return (
              <li key={id} className="list-item">
                <div className="form-control row">
                  <input id="todo-item-cisdk" type="checkbox" checked={done} />
                  <label htmlFor="todo-item-cisdk" className="list-item-label">
                    {doit}
                  </label>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
