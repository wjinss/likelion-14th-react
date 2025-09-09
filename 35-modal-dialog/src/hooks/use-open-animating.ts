import { useEffect, useRef, useState } from 'react'

export default function useOpenAnimating(
  open: boolean,
  // 애니메이션 지속시간 설정
  duration: number = 300
) {
  // 컴포넌트의 상태 (open에 의해 파생된 상태)
  const [visible, setVisible] = useState<boolean>(open)
  // 애니메이션 진행/종료 상태
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  // 타임아웃 식별자(id) 기억
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // 부수 효과 (컴포넌트의 표시, 애니메이션 상태 제어)
  useEffect(() => {
    // 모달 다이얼로그가 열릴 때
    if (open) {
      // visible, isAnimating 상태 true 로 설정
      setVisible(true)
      setIsAnimating(true)
      // 애니메이션 지속시간이 지나면, 애니메이션 종료 상태로 변경
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
      }, duration)
    }
    // 모달 다이얼로그가 닫힐 때
    else if (visible) {
      // 닫히기 전에 애니메이션 시작
      setIsAnimating(true)
      // 애니메이션 지속시간이 지나면, 감춤 & 애니메이션 종료 상태로 변경
      timeoutRef.current = setTimeout(() => {
        setVisible(false)
        setIsAnimating(false)
      }, duration)
    }

    // 타임아웃 정리(cleanup)
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [visible, open, duration])

  // 커스텀 훅이 반환하는 상태 값
  return {
    isAnimating,
    openFinished: visible && !isAnimating,
  }
}
