import { Container, Divider, LearnSection, TodoListApp } from '@/components'
import { TodoListAppGuide } from './guides'

export default function App() {
  return (
    <LearnSection title="할 일 목록 (리듀서 + 컨텍스트)" className="p-10">
      <Container>
        <TodoListApp />
        <Divider />
        <TodoListAppGuide />
      </Container>
    </LearnSection>
  )
}
