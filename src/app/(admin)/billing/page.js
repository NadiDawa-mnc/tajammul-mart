'use client'

import { useEffect, useState } from 'react'
import './billing.css'

export default function Billing() {
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch('/api/orders')
    const result = await data.json()
    console.log(result)
    setOrderData(result.result)
  }

  const fd = () => {
    console.log(orderData)
  }

  return (
    <div className='billing-container'>
      <div className='table'>
        <div className='table-header'>
          <p className='no'>No</p>
          <p className='s'>Order No.</p>
          <p className='s'>Name</p>
          <p className='s'>Campus</p>
          <p className='s'>Payment Status</p>
          <p className='s'>Delivery Status</p>
          <p className='no'>Total</p>
        </div>

        {orderData &&
          orderData.map((item, index) => {
            return (
              <div className='table-items' key={index}>
                <p className='no'>{index + 1}</p>
                <p className='s'>{item.user}</p>
                <p className='s'>{item.customerName}</p>
                <p className='s'>{item.campus}</p>
                <p
                  className='s'
                  style={
                    item.paymentStatus === 'paid'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {item.paymentStatus}
                </p>
                <p
                  className='s'
                  style={
                    item.deliveryStatus === 'Delivered'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {item.deliveryStatus}
                </p>
                <p className='no'>{item.total}</p>
                <button className='1'>Print</button>
              </div>
            )
          })}
      </div>
    </div>
  )
}
