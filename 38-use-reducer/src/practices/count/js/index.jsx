import { useReducer } from 'react'
import { Minus, Plus } from 'lucide-react'
import { init, minusAction, plusAction, reducer } from './reducer'

export default function Counter({ count = 0, step = 1, min = 0, max = 9 }) {
  const [counterStore, dispatch] = useReducer(reducer, count, init)

  const isMinDisabled = counterStore.count === min
  const isMaxDisabled = counterStore.count === max

  const handlePlus = () => dispatch(plusAction(step, max))

  const handleMinus = () => dispatch(minusAction(step, min))

  return (
    <div className="flex space-x-6 items-center">
      <button
        type="button"
        aria-label="카운트 감소"
        disabled={isMinDisabled}
        onClick={handleMinus}
      >
        <Minus />
      </button>

      <output className="text-9xl text-white select-none">
        {counterStore.count}
      </output>

      <button
        type="button"
        aria-label="카운트 증가"
        disabled={isMaxDisabled}
        onClick={handlePlus}
      >
        <Plus />
      </button>
    </div>
  )
}
