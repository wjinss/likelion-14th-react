import { LearnSection } from '@/components'
import ShoppingCart from './components/shopping-cart'

// 시간 관계상 디자인은 구현은 나중으로 미루고
// 컴포넌트의 상태 관리 로직만 구현해봅니다.

export default function App() {
  return (
    <LearnSection title="장바구니 구현" className="p-10">
      <ShoppingCart />
    </LearnSection>
  )
}
