import { useMemo, useReducer } from 'react'
import { Minus, Plus } from 'lucide-react'
import counterReducer, {
  decrementAction,
  incrementAction,
  resetAction,
} from '@/reducers/counter'
import { tw } from '@/utils'

interface Props {
  count?: number
  step?: number
  min?: number
  max?: number
}

export default function Counter(props: Props) {
  const { min = 0, max = 10, step = 1 } = props
  const initialCount = { count: props.count ?? 0 }

  const [state, dispatch] = useReducer(counterReducer, initialCount)
  const handleDecrement = () => dispatch(decrementAction({ min, max, step }))
  const handleIncrement = () => dispatch(incrementAction({ min, max, step }))
  const handleReset = () => dispatch(resetAction(initialCount))
  const isMin = state.count === min
  const isMax = state.count === max

  const buttonStyles = useMemo(
    () =>
      tw(
        'cursor-pointer select-none',
        'grid place-content-center',
        'size-12 border-3 border-white',
        'text-4xl bg-transparent text-white',
        'disabled:cursor-not-allowed disabled:border-current disabled:text-gray-600'
      ),
    []
  )

  return (
    <div className="flex space-x-6 items-center">
      <button
        type="button"
        aria-label="카운트 감소"
        disabled={isMin}
        onClick={handleDecrement}
        className={buttonStyles}
      >
        <Minus />
      </button>

      <output role="none" onClick={handleReset} className="text-9xl text-white">
        {state.count}
      </output>

      <button
        type="button"
        aria-label="카운트 증가"
        disabled={isMax}
        onClick={handleIncrement}
        className={buttonStyles}
      >
        <Plus />
      </button>
    </div>
  )
}
