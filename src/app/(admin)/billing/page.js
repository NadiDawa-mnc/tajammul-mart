'use client'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { LuPrinter } from 'react-icons/lu'

import { useEffect, useState } from 'react'
import './billing.css'
import { IoMdClose } from 'react-icons/io'

export default function Billing() {
  const [orderData, setOrderData] = useState([])
  const [billData, setBillData] = useState([])
  const [amountReceived, setAmountReceived] = useState([])

  let balance = amountReceived - billData.total

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch('/api/orders')
    const result = await data.json()
    console.log(result)
    setOrderData(result.result)
  }

  const viewBill = (item) => {
    setBillData(item)
    console.log('item', item)
  }

  return (
    <div className='billing-container'>
      {billData.cartItems ? (
        <div className='Bill-view-container'>
          <div className='Bill-box'>
            <div className='bill-header'>
              <h2>Invoice</h2>
              <p>
                <IoMdClose
                  className='bill-close'
                  onClick={() => {
                    setBillData([])
                    setAmountReceived('')
                  }}
                />
              </p>
            </div>

            <div className='bill-customer'>
              <div className='bill-customer-details'>
                <p>Invoice : {billData.orderNumber}</p>
                <p>
                  Recipient:{' '}
                  <span className='bold'>{billData.customerName}</span>
                </p>
                <p>
                  Campus:
                  <span className='bold'> {billData.campus}</span>
                </p>
              </div>
              <div className='bill-customer-time'>
                <p>
                  Date:{' '}
                  {(() => {
                    const [year, month, day] = billData.createdAt
                      .split('T')[0]
                      .split('-')
                    return `${day}-${month}-${year}`
                  })()}
                </p>

                <p>
                  Time:{' '}
                  {new Date(billData.createdAt).toLocaleTimeString('en-US')}
                </p>
              </div>
            </div>

            <div className='bill-deatils'>
              <h2>Details</h2>
              <div className='bill-items'>
                <table
                  cellPadding='1'
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                  }}
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                    <tr style={{ height: '10px' }}></tr>
                    <tr>
                      <td colSpan='5'>
                        <hr style={{ border: '0.5px solid #00000051' }} />
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr style={{ height: '10px' }}></tr>
                    {billData.cartItems.map((item, index) => (
                      <tr style={{ height: '30px' }} key={index}>
                        <td className='tds'>{index + 1}</td>
                        <td className='tds'>{item.name}</td>
                        <td className='tds'>
                          {item.price % 1 === 0
                            ? item.price
                            : item.price.toFixed(2)}
                        </td>
                        <td className='tds'>{item.count}</td>
                        <td className='tds'>
                          {(item.price * item.count) % 1 === 0
                            ? item.price * item.count
                            : (item.price * item.count).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ height: '10px' }}></tr>

                    <tr style={{ height: '10px' }}>
                      <td colSpan='5'>
                        <hr style={{ border: '0.5px solid #00000051' }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='bill-total'>
                <div>Grand Total:</div>
                <div>{billData.total}</div>
              </div>
            </div>
            <div className='bill-alert'>
              {billData.deliveryStatus === 'Delivered' &&
              billData.paymentStatus === 'paid' ? (
                <div className='bill-alert-success'>
                  <IoCheckmarkCircleSharp
                    size={30}
                    style={{ color: '#08841b' }}
                  />
                  <p>
                    Item has been {billData.deliveryStatus}, and Paid by{' '}
                    {billData.paymentMode}
                  </p>
                </div>
              ) : (
                <div className='bill-alert-failed'>
                  <IoAlertCircleOutline
                    size={30}
                    style={{ color: '#f7941d' }}
                  />

                  <p>
                    Item has been {billData.deliveryStatus}, but{' '}
                    {billData.paymentStatus}
                  </p>
                </div>
              )}
            </div>

            {billData.paymentStatus === 'not-paid' && (
              <div className='bill-cash-pay'>
                <input
                  value={amountReceived}
                  type=''
                  className='amount-pay'
                  placeholder='Amount Recieved'
                  onChange={(e) => setAmountReceived(e.target.value)}
                />{' '}
                <p>Balance : {balance} </p>
              </div>
            )}

            <div className='bill-footer'>
              <button className='cancel-button'>Cancel</button>
              <button className='print-button'>
                Print <LuPrinter />
              </button>
              <button className='save-button'>Create Invoice</button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

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
                <button onClick={() => viewBill(item)} className='1'>
                  View
                </button>
              </div>
            )
          })}
      </div>
    </div>
  )
}
