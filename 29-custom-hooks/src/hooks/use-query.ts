import { useCallback, useEffect, useRef } from 'react'
import { type Draft } from 'immer'
import { useImmer } from 'use-immer'
import { type State } from '@/@types/global'

const init = <T>(): State<T> => ({
  status: 'idle',
  error: null,
  data: null,
})

export default function useQuery<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const [state, setState] = useImmer<State<T>>(init)

  const abortControllerRef = useRef<AbortController>(null)

  const isLoading = state.status === 'pending'
  const hasError = !!state.error

  const fetchData = useCallback(
    async (url: string, options?: RequestInit) => {
      try {
        setState((draft) => {
          draft.status = 'pending'
          draft.error = null
        })

        const response = await fetch(url, options)
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(
            typeof responseData === 'string'
              ? responseData
              : JSON.stringify(responseData)
          )
        }

        setState((draft) => {
          draft.status = 'resolved'
          draft.data = responseData as Draft<T>
        })
      } catch (error) {
        const errorObject: Error = error as Error
        if (errorObject.name === 'AbortError') return
        setState((draft) => {
          draft.status = 'rejected'
          draft.error = errorObject
        })
      }
    },
    [setState]
  )

  const refetch = useCallback(async () => {
    abortControllerRef.current = new AbortController()
    await fetchData(url, {
      signal: abortControllerRef.current.signal,
      ...options,
    })
  }, [fetchData, url, options])

  const reset = useCallback(() => {
    setState(init)
  }, [setState])

  useEffect(() => {
    abortControllerRef.current = new AbortController()
    fetchData(url, { signal: abortControllerRef.current.signal, ...options })
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [url, options, fetchData])

  return { ...state, isLoading, hasError, refetch, reset }
}

// ---------------------------------------------------------------

;() => {
  const init = <T>(): State<T> => ({
    // 인터페이스 State<T>를 받아서 T라는 제네릭 타입을 받아 init함수를 어떤 타입이든 T로 이름을 설정
    status: 'idle',
    error: null,
    data: null,
  })

  function useQuery<T = unknown>(url: string, options?: RequestInit) {
    // 유즈 쿼리 함수는 제네릭 T의 타입을 받는데 언노운으로 설정한다. 매개변수로 문자열 url을 받고, 옵션 배개변수를 받으면 RequestInit로 설정한다

    const [state, setState] = useImmer<State<T>>(init)
    // 초기 상태를 지정하는데, 인터페이스 State<T>를 타입으로 지정한다.

    const abortControllerRef = useRef<AbortController>(null)
    // 어보트컨트롤러를 참조로 받으며, 해당 참조의 타입은 어보트컨트롤러이다..?

    const isLoading = state.status === 'pending' // 상태의 status값이 펜딩인 값을 isLoading로 설정
    const hasError = !!state.error // 상태의 error 값을 false로 변경해 hasError로 설정

    const fetchData = useCallback(
      async (url: string, options?: RequestInit) => {
        // fetchData 함수는 비동기로 작동하며, 매개변수로 문자열 url을 받고, 옵션 배개변수를 받으면 RequestInit 옵션 객체로 설정한다
        try {
          setState((draft) => {
            draft.status = 'pending'
            draft.error = null
            // 상태의 status 값을 'pending'으로 변경하고, error의 값을 null로 변경한다.
          })

          const response = await fetch(url, options) // 매개변수로 받은 값을 fetch에 넣어 반환값을 받아 response로 선언한다
          const responseData = await response.json() // response를 JSON으로 바꾼 값을 responseData로 선언한다.

          if (!response.ok) {
            // response가 정상적으로 통신이 되지 않았으면 에러를 던진다
            throw new Error(
              typeof responseData === 'string'
                ? responseData
                : JSON.stringify(responseData)
            )
            // responseData의 타입이 문자열이면 responseData를 반환하고, 아니면 responseData를 JSON으로 바꾼다
          }

          setState((draft) => {
            draft.status = 'resolved'
            draft.data = responseData as Draft<T>
            // response.ok 즉, 통신이 성공(200 ~ 299)하면 상태의 status값을 리졸브로 변경하고 data값을 <T>타입을 갖는 responseData로 변경한다.
          })
        } catch (error) {
          const errorObject: Error = error as Error
          // 에러 객체를 받은 걸 errorObject로 선언하며, 타입은 Error로 설정, 단언한다.

          if (errorObject.name === 'AbortError') return
          // 에러객체의 이름이 'AbortError'면은 함수를 종료('AbortError'는 에러가 아니고 요청 취소 상황이라 에러가 아님)

          setState((draft) => {
            draft.status = 'rejected'
            draft.error = errorObject
            // 에러가 발생하면 상태의 status값을 리젝트(거부됨)로 변경하고 상태의 error값을 에러 객체로 변경한다
          })
        }
      },
      // 상태 업데이트 함수가 바뀌면 리렌더링
      [setState]
    )

    const refetch = useCallback(async () => {
      abortControllerRef.current = new AbortController()
      // 어보트컨트롤러의 현재 참조값에 새 어보트컨트롤러 인스턴스를 저장

      await fetchData(url, {
        // 페치데이터 함수를 호출하며, 두번째 매개변수로 옵션 객체를 전달하는데 옵션 객체의 signal값을 어보트컨트롤러 참조의 현재 시그널값으로 덮어 옵션 객체를 반환한다.
        signal: abortControllerRef.current.signal,
        ...options,
      })
    }, [fetchData, url, options])
    // 의존성들이 변할 때마다 refetch 함수가 새로 생성

    const reset = useCallback(() => {
      setState(init) // 기존 상태를 초기값으로 변경
    }, [setState])
    // 의존성이 변할 때마다 reset 함수 새로 생성

    useEffect(() => {
      abortControllerRef.current = new AbortController()
      // 어보트컨트롤러의 현재 참조값에 새 어보트컨트롤러 인스턴스를 저장

      fetchData(url, { signal: abortControllerRef.current.signal, ...options })
      // 페치데이터 함수를 호출하며, 두번째 매개변수로 옵션 객체를 전달하는데 옵션 객체의 signal값을 어보트컨트롤러 참조의 현재 시그널값으로 덮어 옵션 객체를 반환한다.

      return () => {
        abortControllerRef.current?.abort()
        // 현재 진행중인 페치 요청을 취소한다.
      }
    }, [fetchData, url, options])

    return { ...state, isLoading, hasError, refetch, reset }
    //useQuery 커스텀훅은 복사된 상태, 상태의 status값, 에러객체, 리패치 함수, 리셋 함수를 반환한다.
  }
}
