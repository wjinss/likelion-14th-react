import { useState } from 'react'
import { LearnSection } from '@/components'

export default function App() {
  return (
    <LearnSection title="DOM 참조">
      <DOMRefDemo />
    </LearnSection>
  )
}

// --------------------------------------------------------------------------

function DOMRefDemo() {
  const [attach, setAttach] = useState<boolean>(false)

  const pRef = useRef(null)
  const intervalRef = useRef()

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
