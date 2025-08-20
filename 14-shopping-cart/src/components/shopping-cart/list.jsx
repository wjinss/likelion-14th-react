import { useImmer } from 'use-immer'
import INITIAL_PRODUCTS from '@/data/cart.json'
import CartItem from './item'

export default function CartList() {
  const [products, setProducts] = useImmer(INITIAL_PRODUCTS)

  console.log(products.at(0).quantity)

  return (
    <ul>
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          setProducts={setProducts}
        />
      ))}
    </ul>
  )
}
