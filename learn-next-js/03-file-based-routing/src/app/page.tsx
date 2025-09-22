import { Section } from '@/components'

export default function HomePage() {
  return (
    <Section
      title={
        <>
          <em className="text-pink-700 not-italic">홈</em>페이지
        </>
      }
      // className="bg-amber-300"
    >
      <p>홈 페이지 방문</p>
    </Section>
  )
}
