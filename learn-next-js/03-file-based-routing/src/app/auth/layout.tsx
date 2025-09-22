import type { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  console.log('로그인 레이아웃')
  return <div className="bg-amber-300 flex-1">{children}</div>
}
