import { LearnSection } from '@/components'
import RandomCountUp from './demo'
import ErrorBoundary from './error-boundary'

export default function App() {
  // throw new Error('App 에러 발생')

  return (
    <LearnSection title="랜덤 카운트 업" className="p-10">
      <ErrorBoundary
        FallbackComponent={
          <p role="alert" className="bg-red-800 text-white p-10">
            오류 발생!
          </p>
        }
      >
        <RandomCountUp />
      </ErrorBoundary>
    </LearnSection>
  )
}
