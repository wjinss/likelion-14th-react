import CartItem from './item'

export default function CartList({ products, setProducts }) {
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
