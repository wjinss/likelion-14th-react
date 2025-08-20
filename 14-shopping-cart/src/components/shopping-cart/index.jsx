import { useImmer } from 'use-immer'
import INITIAL_PRODUCTS from '@/data/cart.json'
import CartList from './list'
import Total from './total'

export default function ShoppingCart() {
  const [products, setProducts] = useImmer(INITIAL_PRODUCTS)

  const totalPrice = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  )

  const handleUpdateProductQuantity = (productId, amount) => {
    setProducts((draft) => {
      const updateProduct = draft.find((p) => p.id === productId)
      updateProduct.quantity += amount
    })
  }

  return (
    <section className="border-4 border-sky-900 bg-white shadow-xl p-5 rounded-[8px] flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">장바구니</h2>
      <CartList
        products={products}
        onUpdateProduct={handleUpdateProductQuantity}
      />
      <Total totalPrice={totalPrice} />
    </section>
  )
}
