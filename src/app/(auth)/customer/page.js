'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import './customer.css'
import GPayQRCode from '@/app/components/gpay/gpay'
import { useRouter } from 'next/navigation'

export default function Customer() {
  const router = useRouter()
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
  const placeOrder = () => {
    router.push('/home')
  }

  return (
    <div className='Customer-main-container'>
      <div className='order-container'>
        <p className='order-title'>Your Order Details</p>

        <div className='order-container02'>
          <div className='customer-details-container'>
            <div className='customer-details-input'>
              <p className='title-01'>Customer Details</p>
              <div>
                <input
                  className='input'
                  type='text'
                  placeholder='Customer Name'
                />
              </div>

              <div>
                <input className='input' type='text' placeholder='Campus' />
              </div>
            </div>
            <div className='customer-payment-mode'>
              <p className='title-01'>Payment Mode</p>
              <div>
                <input
                  style={{
                    transform: 'scale(1.1)',
                    marginRight: '8px',
                    marginTop: '6px',
                  }}
                  type='radio'
                  name='payment'
                  id='cash'
                />
                <label htmlFor='cash'>Cash</label>
              </div>

              <div>
                <input
                  style={{
                    transform: 'scale(1.1)',
                    marginRight: '8px',
                    marginTop: '8px',
                  }}
                  type='radio'
                  name='payment'
                  id='online'
                />
                <label htmlFor='online'>Online Payment</label>
              </div>
            </div>
            <div className='customer-Delivery-status'>
              <p className='title-01'>Delivery Status</p>
              <div className='customer-customer-item'>
                <input
                  style={{
                    transform: 'scale(1.1)',
                    marginRight: '8px',
                    marginTop: '8px',
                  }}
                  type='radio'
                  name='DeliveredStatus'
                  id='Delivered'
                />
                <label htmlFor='Delivered'>Delivered</label>
              </div>
              <div className='customer-customer-item'>
                <input
                  style={{
                    transform: 'scale(1.1)',
                    marginRight: '8px',
                    marginTop: '8px',
                  }}
                  type='radio'
                  name='DeliveredStatus'
                  id='not-Delivered'
                />
                <label htmlFor='not-Delivered'>Not Delivered</label>
              </div>
            </div>
          </div>
          <div className='order-details-container'>
            <p className='title-03'>Order Details</p>
            <div className='customer-cart-container'>
              <table
                cellPadding='1'
                style={{ width: '100%', borderCollapse: 'collapse' }}
              >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Items</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        {item.price % 1 === 0
                          ? item.price
                          : item.price.toFixed(2)}
                      </td>
                      <td>{item.count}</td>
                      <td>
                        {(item.price * item.count) % 1 === 0
                          ? item.price * item.count
                          : (item.price * item.count).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className='total-cost'>Total: ₹{total}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='payment-container'>
        <div className='payment-Qr-container'>
          <GPayQRCode money={total} />
        </div>
        <div className='payment-status-container'>
          <p className='title-04'>Payment Status:</p>

          <div className='payment-status'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                style={{
                  transform: 'scale(1.1)',
                  marginRight: '4px',
                }}
                type='radio'
                name='paymentStatus'
                id='paid'
              />
              <label htmlFor='paid'>Paid</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                style={{
                  transform: 'scale(1.1)',
                  marginRight: '4px',
                }}
                type='radio'
                name='paymentStatus'
                id='not-paid'
              />
              <label htmlFor='not-paid'>Not Paid</label>
            </div>
          </div>
        </div>

        <button className='place-order-btn' onClick={placeOrder}>
          Place Your Order
        </button>
      </div>
    </div>
  )
}
