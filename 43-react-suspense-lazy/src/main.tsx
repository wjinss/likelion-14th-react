import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { LucideLoader } from 'lucide-react'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components'
import { AuthProvider } from '@/contexts/auth'
import App from './app'
import './styles/main.css'

const root = document.getElementById('root')
if (!root) throw new Error('문서에 #root 요소가 존재하지 않습니다.')

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <Suspense
          fallback={
            <div role="status">
              <LucideLoader className="animate-spin duration-700 size-8" />앱
              로딩 중..
            </div>
          }
        >
          <App />
        </Suspense>
      </AuthProvider>
      <Toaster position="bottom-right" />
    </ErrorBoundary>
  </StrictMode>
)
