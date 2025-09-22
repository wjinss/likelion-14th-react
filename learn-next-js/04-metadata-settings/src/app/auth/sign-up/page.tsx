import type { Metadata } from 'next'
import { Section } from '@/components'

export const metadata: Metadata = {
  title: '회원가입 | LearnMate',
  description: '회원가입을 하면 어쩌구 저쩌구..',
}

export default function SignUpPage() {
  return (
    <Section title="회원가입 페이지">
      <p>회원가입 페이지 방문</p>
    </Section>
  )
}
