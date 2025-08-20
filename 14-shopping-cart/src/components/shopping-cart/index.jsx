import CartList from './list'
import Total from './total'

export default function ShoppingCart() {
  return (
    <section className="border-4 border-sky-900 bg-white shadow-xl p-5 rounded-[8px] flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">장바구니</h2>
      <CartList />
      <Total />
    </section>
  )
}
