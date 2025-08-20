export default function CartCounter({ quantity, updateQuantity, inventory }) {
  const isMinQuantity = quantity === 1
  const isMaxQuantity = quantity === inventory

  return (
    <div role="group" className="flex gap-1 text-xl">
      <button
        type="button"
        className={buttonClassNames}
        aria-label="수량 1 감소"
        disabled={isMinQuantity}
        onClick={() => updateQuantity(-1)}
      >
        -
      </button>
      <output aria-label={`수량: ${quantity}개`}>{quantity}</output>
      <button
        type="button"
        className={buttonClassNames}
        aria-label="수량 1 증가"
        disabled={isMaxQuantity}
        onClick={() => updateQuantity(1)}
      >
        +
      </button>
    </div>
  )
}

const buttonClassNames =
  'cursor-pointer grid place-content-center w-6 h-6 leading-0 disabled:cursor-not-allowed'
