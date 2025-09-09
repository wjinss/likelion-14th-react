interface CounterState {
  count: number
}

interface CounterPayload {
  step: number
  min: number
  max: number
}

type CounterAction = {
  type: keyof typeof ACTION_TYPES
  payload: CounterPayload | CounterState
}

// --------------------------------------------------------------------------

const ACTION_TYPES = {
  INCREAMENT_COUNT: 'INCREAMENT_COUNT',
  DECREAMENT_COUNT: 'DECREAMENT_COUNT',
  RESET_COUNT: 'RESET_COUNT',
} as const

// --------------------------------------------------------------------------

export default function counterReducer(
  { count }: CounterState,
  { type, payload }: CounterAction
) {
  switch (type) {
    case ACTION_TYPES.DECREAMENT_COUNT: {
      const { step, min } = payload as CounterPayload
      let nextCount = count - step
      if (nextCount < min) nextCount = min
      return { count: nextCount }
    }

    case ACTION_TYPES.INCREAMENT_COUNT: {
      const { step, max } = payload as CounterPayload
      let nextCount = count + step
      if (nextCount > max) nextCount = max
      return { count: nextCount }
    }

    case ACTION_TYPES.RESET_COUNT: {
      return payload as CounterState
    }

    default: {
      return { count }
    }
  }
}

// --------------------------------------------------------------------------

export const incrementAction = (payload: CounterPayload): CounterAction => ({
  type: ACTION_TYPES.INCREAMENT_COUNT,
  payload: payload,
})

export const decrementAction = (payload: CounterPayload): CounterAction => ({
  type: ACTION_TYPES.DECREAMENT_COUNT,
  payload: payload,
})

export const resetAction = (
  initialCountValue: CounterState
): Pick<CounterAction, 'type'> & { payload: CounterState } => ({
  type: ACTION_TYPES.RESET_COUNT,
  payload: initialCountValue,
})
