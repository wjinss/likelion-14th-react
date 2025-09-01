import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { LearnSection } from '@/components'

export default function App() {
  return (
    <LearnSection title="DOM 참조" style={{ flexDirection: 'column' }}>
      <ConfettiDemo />
    </LearnSection>
  )
}

// --------------------------------------------------------------------------

interface Size {
  width: number
  height: number
}

const getSize = (): Size => ({
  width: window.innerWidth,
  height: window.innerHeight,
})

function ConfettiDemo() {
  const [size, setSize] = useState<Size>(getSize)

  useEffect(() => {
    const handleResize = () => setSize(getSize)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleConfetti = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // confetti 라이브러리에 canvas DOM 전달
    confetti.create(canvas, { resize: true })({
      particleCount: 190,
      spread: 180,
      origin: { y: 0.5 },
    })
  }

  return (
    <>
      <button type="button" className="button" onClick={handleConfetti}>
        폭죽 효과
      </button>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          ...size,
        }}
      />
    </>
  )
}

// --------------------------------------------------------------------------

function DOMRefDemo() {
  const [attach, setAttach] = useState<boolean>(true)

  // DOM 참조 (컴포넌트 렌더링 결과로 실제 DOM 요소 접근/조작)
  const pRef = useRef<HTMLParagraphElement>(null)

  // 값 참조 (웹 API의 타이머 값 참조)
  const intervalRef = useRef<Timeout>(undefined)

  useEffect(() => {
    const pElement = pRef.current

    pElement?.setAttribute('tabindex', '-1')
    pElement?.focus()

    intervalRef.current = setInterval(() => {
      console.log(new Date().toLocaleTimeString())
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="paragraphes space-y-2 [&_p]:text-gray-700 [&_p]:font-semibold">
      {attach && (
        <div className="bg-amber-300 p-5 pt-2.5 my-2">
          <p
            ref={pRef}
            className="focus:outline-16 outline-offset-4 outline-blue-500/40"
          >
            하나
          </p>
          <button
            className="button mt-2"
            onClick={() => {
              setAttach((a) => !a)
              clearInterval(intervalRef.current)
            }}
          >
            토글
          </button>
        </div>
      )}
      <p>둘</p>
      <p>셋</p>
    </div>
  )
}
