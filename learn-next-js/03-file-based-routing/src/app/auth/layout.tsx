import type { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className="bg-amber-300 p-20">{children}</div>
}
