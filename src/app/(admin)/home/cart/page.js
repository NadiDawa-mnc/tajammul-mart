'use client'
import Image from 'next/image'
import './cart.css'
import { MdDelete } from 'react-icons/md'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Cart({ cartItems, removeFromCart }) {
  const [customerData, setCustomerData] = useState(false)

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  )

  const router = useRouter()
  const proceedItem = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty')
      return
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    router.push('./customer')
    console.log('Proceeding to checkout...')
  }

  return (
    <div className='cart-container'>
      <div className='cart-header-container'>
        <p>Cart</p> <p>Items: {cartItems?.length}</p>
      </div>
      <div className='cart-product-container'>
        {cartItems.map((item, index) => (
          <div key={index}>
            <div className='cart-item'>
              <Image src={item.img} alt={item.name} width={30} height={40} />
              <div className='cart-item-name'>
                <p>{item.name}</p>
                <p className='cart-item-desc'>{item.description}</p>
              </div>
              <p className='cart-item-price'>
                {item.count} x ₹{item.price}
              </p>
              <button
                className='remove-btn'
                onClick={() => removeFromCart(index)}
                title={`Remove ${item.name}`}
              >
                <MdDelete />
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div className='cart-checkout-container'>
        <button className='cancel-btn'>Total: ₹{total.toFixed(2)}</button>
        <button className='checkout-btn' onClick={proceedItem}>
          Proceed
        </button>
      </div>
    </div>
  )
}
