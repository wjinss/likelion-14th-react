import { Section } from '@/components'

export default async function UsingCatchAllPage({
  params,
}: {
  params: Promise<{ ids: string[] }>
}) {
  const { ids } = await params

  console.log({ ids })

  return (
    <Section title="Catch-all 세그먼트">
      <p>모든 라우트를 포착하는 페이지입니다.</p>
      <output className="bg-slate-200/80 py-1.5 px-3.5 rounded">
        {ids.join(' / ')}
      </output>
    </Section>
  )
}
