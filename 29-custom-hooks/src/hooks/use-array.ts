import { useCallback, useState } from 'react'

export default function useArray<Type = unknown>(initialValue: Type[]) {
  const [array, setArray] = useState(initialValue)

  const set = useCallback((nextArray: Type[]) => {
    setArray(nextArray)
  }, [])

  const push = useCallback((...items: Type[]) => {
    setArray((array) => [...array, ...items])
  }, [])

  const unshift = useCallback((...items: Type[]) => {
    setArray((array) => [...items, ...array])
  }, [])

  const replace = useCallback((index: number, item: Type) => {
    setArray((array) =>
      array.map((arrayItem, i) => (i === index ? item : arrayItem))
    )
  }, [])

  const filter = useCallback(
    (fn: (item: Type, index: number, array: Type[]) => boolean) => {
      setArray((array) => array.filter(fn))
    },
    []
  )

  const remove = useCallback((index: number) => {
    return setArray((array) => array.filter((_, i) => i !== index))
  }, [])

  const clear = useCallback(() => setArray([]), [])

  const reset = useCallback(() => setArray(initialValue), [initialValue])

  return { array, set, push, unshift, replace, filter, remove, reset, clear }
}

// ---------------------------------------------------------------

;() => {
  function useArrayPractice<Type = unknown>(initialValue: Type[]) {
    const [array, setArray] = useState(initialValue) // 매개변수를 상태의 초기값으로 설정

    // 배열 전체를 새로운 값으로 설정
    const set = useCallback((nextArray: Type[]) => {
      setArray(nextArray)
    }, [])
    // 매개변수로 받는 배열을 새로운 상태로 지정하고, 유즈콜백을 사용해 값을 기록

    // 배열의 뒤에 새 요소를 추가
    const push = useCallback((...items: Type[]) => {
      setArray((array) => [...array, ...items])
      // 매개변수로 받는 배열을 기존 배열의 뒤에 추가한다.(서로 복사본으로 불변성을 유지)
    }, [])

    // 배열의 앞에 새 요소를 추가
    const unshift = useCallback((...items: Type[]) => {
      setArray((array) => [...items, ...array])
      // 매개변수로 받는 배열을 기존 배열의 앞에 추가한다.(서로 복사본으로 불변성을 유지)
    }, [])

    // 특정 인덱스의 요소를 새 값으로 교체
    const replace = useCallback((index: number, item: Type) => {
      setArray((array) =>
        array.map((arrayItem, i) => (i === index ? item : arrayItem))
      )
      // 매개변수로 받은 인덱스와 아이템을 가지고 배열을 순환해서
      // 배열의 인덱스와 매개변수의 인덱스가 같으면 요소를 매개변수의 아이템으로 변경
    }, [])

    // 배열 필터링
    const filter = useCallback(
      (fn: (item: Type, index: number, array: Type[]) => boolean) => {
        setArray((array) => array.filter(fn))
      }, // 매개변수로 함수를 받는데, 그 함수의 매개변수에는 아이템, 인덱스, 배열을 받으먀, 반환값으로 논리형을 받아 false면 제거
      // 즉, 받은 함수의 매개변수의 타입들은 filter의 콜백 함수와 동일
      // 이전 상태 array를 받아서 filter로 fn의 조건에 맞는 요소만 남겨 새로운 배열을 복사
      []
    )

    // 특정 인덱스의 요소 삭제
    const remove = useCallback((index: number) => {
      return setArray((array) => array.filter((_, i) => i !== index))
      // 기존 배열의 인덱스와 매개변수로 받은 인덱스가 같지 않으면 해당 인덱스를 제거한다.
    }, [])

    // 배열 비우기
    const clear = useCallback(() => setArray([]), [])
    // 기존 배열을 빈 배열로 변경한다.

    // 배열을 초기값으로 리셋
    const reset = useCallback(() => setArray(initialValue), [initialValue])
    // 배열을 상태의 초기값(원본 배열)로 변경한다

    return { array, set, push, unshift, replace, filter, remove, reset, clear }
    // 상태 배열과 각 메서드를 반환
  }
}
