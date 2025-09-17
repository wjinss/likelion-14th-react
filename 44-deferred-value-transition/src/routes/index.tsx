import { createFileRoute } from '@tanstack/react-router'
import { tw } from '@/utils'

function Page() {
  return (
    <section
      lang="en"
      className={tw`
      flex justify-center items-center
    `}
    >
      <h1 className="text-7xl uppercase font-black">hello React</h1>
    </section>
  )
}

export const Route = createFileRoute('/')({
  component: Page,
})
