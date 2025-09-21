import { Button } from '@/components'

export default function HomePage() {
  return (
    <section className="p-20 flex flex-col gap-y-2 items-start">
      <h1 className="text-6xl font-thin">홈 페이지</h1>
      <Button className="px-4 py-1.5 bg-black text-white rounded">
        로그인
      </Button>
    </section>
  )
}
