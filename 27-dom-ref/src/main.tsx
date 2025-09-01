import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './styles/main.css'

// const root = document.getElementById('root') as HTMLDivElement // 확실화다가 ts에게 말하는 것
// const root = document.getElementById('root')! // ts에게 null일 가능성이 없다! 라고 알려줌
const root = document.getElementById('root')

if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
