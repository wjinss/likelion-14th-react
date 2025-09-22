import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '대시보드 | LearnMate',
}

export default function DashboardPage() {
  return (
    <Section title="대시보드 페이지">
      <p>대시보드 페이지 방문</p>
    </Section>
  )
}
