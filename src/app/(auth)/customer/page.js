'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import './customer.css'
import GPayQRCode from '@/app/components/gpay/gpay'

export default function Customer() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('cartItems')
    if (data) {
      try {
        setCartItems(JSON.parse(data))
      } catch (err) {
        console.error('Error parsing cart items:', err)
      }
    }
  }, [])

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  )

  return (
    <div className='customer-container'>
      <div className='customer-customer-container'>
        <div className='customer-header-container'>
          <p>Customer Details</p>
          <div className='customer-product-container'>
            <div className='customer-customer-item'>
              <input type='text' placeholder='Customer Name' />
            </div>

            <div className='customer-customer-item'>
              <input type='text' placeholder='Campus' />
            </div>
          </div>
        </div>

        <div className='customer-header-container'>
          <p>Payment Mode</p>
          <div className='customer-product-container'>
            <div className='customer-customer-item'>
              <input type='radio' name='payment' id='cod' />
              <label htmlFor='cod'>Cash</label>
            </div>

            <div className='customer-customer-item'>
              <input type='radio' name='payment' id='online' />
              <label htmlFor='online'>Online Payment</label>
            </div>
          </div>
        </div>

        <div className='customer-header-container'>
          <p>Delivery Status</p>
          <div className='customer-product-container'>
            <div className='customer-customer-item'>
              <input type='radio' name='deliveryStatus' id='delivered' />
              <label htmlFor='delivered'>Delivered</label>
            </div>

            <div className='customer-customer-item'>
              <input type='radio' name='deliveryStatus' id='stockOut' />
              <label htmlFor='stockOut'>Stock Out</label>
            </div>

            <div className='customer-customer-item'>
              <input type='radio' name='deliveryStatus' id='notDelivered' />
              <label htmlFor='notDelivered'>Not Delivered</label>
            </div>
          </div>
        </div>

        <div className='customer-header-container'>
          <p>Payment Status</p>
          <div className='customer-product-container'>
            <div className='customer-customer-item'>
              <input type='radio' name='deliveryStatus' id='delivered' />
              <label htmlFor='delivered'>Delivered</label>
            </div>

            <div className='customer-customer-item'>
              <input type='radio' name='deliveryStatus' id='stockOut' />
              <label htmlFor='stockOut'>Stock Out</label>
            </div>

            <div className='customer-customer-item'>
              <input type='radio' name='deliveryStatus' id='notDelivered' />
              <label htmlFor='notDelivered'>Not Delivered</label>
            </div>
          </div>
        </div>
      </div>

      <GPayQRCode money={total} />

      <div className='customer-cart-container'>
        <div className='cart-header-container'>
          <p>Items</p> <p>Items: {cartItems?.length}</p>
        </div>
        <div className='cart-product-container'>
          {cartItems.map((item, index) => (
            <div key={index}>
              <div className='customer-cart-item'>
                <p>{index + 1}.</p>
                <div className='customer-cart-item-name'>
                  <p>{item.name}</p>
                </div>
                <p className='cart-item-price'>
                  {item.count} x ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='cart-checkout-container'>
          <button className='cancel-btn'></button>
          <button className='checkout-btn'>Total: ₹{total.toFixed(2)}</button>
        </div>
      </div>
    </div>
  )
}
