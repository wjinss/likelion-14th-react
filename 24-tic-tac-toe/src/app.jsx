import { LearnSection } from '@/components'
import RandomCountUp from '@/demo/app'
import TicTacToe from './components/tic-tac-toe/tic-tac-toe'

export default function App() {
  return (
    <LearnSection title="틱택토 게임">
      <TicTacToe />
    </LearnSection>
  )
}
