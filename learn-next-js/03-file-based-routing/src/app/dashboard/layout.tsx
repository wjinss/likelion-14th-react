import type { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex gap-2 justify-between p-5 border-4 border-t-24 border-slate-200">
      {children}
    </div>
  )
}
