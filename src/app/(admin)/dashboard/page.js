'use client'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { LuPrinter } from 'react-icons/lu'
import { IoMdRefresh } from 'react-icons/io'
import './style.css'

import { useEffect, useState } from 'react'
import '../billing/billing.css'
import { IoMdClose } from 'react-icons/io'
import PrintComponent2 from '@/app/components/printComp2/PrintComponent2'
import PrintComponent from '@/app/components/printComp/PrintComponent'

export default function Dashboard() {
  const [orderData, setOrderData] = useState([])
  const [billData, setBillData] = useState([])
  const [amountReceived, setAmountReceived] = useState([])
  const [paymentStatus, setPaymentStatus] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState('')
  const [billedStatus, setBilledStatus] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const [grandTotal, setGrandTotal] = useState(0)
  const [itemTotals, setItemTotals] = useState(0)

  let balance = amountReceived - billData.total

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setSpinning(true)

    try {
      const data = await fetch('/api/invoice')
      const result = await data.json()

      const orders = result.result
      setOrderData(orders)
      console.log(orders)

      // Calculate grand total
      const totalAmount = orders.reduce((sum, order) => sum + order.total, 0)

      const itemTotals = {}

      orders.forEach((order) => {
        order.cartItems.forEach((item) => {
          if (!itemTotals[item.name]) {
            itemTotals[item.name] = 0
          }
          itemTotals[item.name] += item.count
        })
      })

      setGrandTotal(totalAmount)
      setItemTotals(itemTotals)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setTimeout(() => setSpinning(false), 1000)
    }
  }

  const viewBill = (item) => {
    setBillData(item)
    setAmountReceived(item.amountReceived || '')
    setPaymentStatus(item.paymentStatus || '')
    setDeliveryStatus(item.deliveryStatus || '')
    console.log(item)
  }
  const deleteOrder = async () => {
    if (!billData._id) return

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Invoice?'
    )
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/orders/${billData._id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setBillData([])
        setAmountReceived('')
        fetchData()
      } else {
        alert('Failed to delete the order.')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred while deleting.')
    }
  }

  const handleSaveUpdate = async () => {
    if (!billData._id) return

    const updated = {
      billedStatus,
      paymentStatus,
      amountReceived,
      deliveryStatus,
    }

    try {
      const res = await fetch(`/api/orders/${billData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      })

      if (res.ok) {
        const updatedOrder = await res.json()
        setBillData((prev) => ({ ...prev, ...updated }))
        fetchData()
      } else {
        alert('Failed to update statuses.')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating statuses.')
    }
  }
  const createInvoice = async () => {
    if (!billData._id) return

    const updated = {
      billedStatus,
    }

    try {
      const res = await fetch(`/api/orders/${billData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      })

      if (res.ok) {
        const updatedOrder = await res.json()
        setBillData((prev) => ({ ...prev, ...updated }))
        alert('Created invoice successfully!')
        setBillData([])
        setAmountReceived('')
        fetchData()
      } else {
        alert('Failed to create invoice')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating statuses.')
    }
  }
  return (
    <div className='dashboard-container'>
      {billData.cartItems ? (
        <div className='Bill-view-container'>
          <div className='bill-box'>
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
                      <th>Qty/Mtr</th>
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
            <div className='bill-alert'></div>

            <div className='bill-footer'></div>
            <div className='bt'>
              <button onClick={deleteOrder} className='delete-button'>
                Delete
              </button>

              <PrintComponent2 billData={billData} />
              <PrintComponent billData={billData} />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className='dashboard-boxes-container'>
        <div className='dashboard-boxes'>
          <h4
            style={{ textAlign: 'center', marginTop: '10px' }}
            className='dashboard-heading'
          >
            Total Sales:
          </h4>
          <h1 className='dashboard-hilight' style={{ textAlign: 'center' }}>
            {grandTotal}
          </h1>
        </div>

        <div className='dashboard-boxes'>
          <h4
            style={{ textAlign: 'center', marginTop: '10px' }}
            className='dashboard-heading'
          >
            Total Customers:
          </h4>
          <h1 className='dashboard-hilight' style={{ textAlign: 'center' }}>
            {orderData.length}
          </h1>
        </div>

        {Object.entries(itemTotals).map(([name, total]) => (
          <div key={name} className='dashboard-boxes'>
            <h4
              className='dashboard-heading'
              style={{ textAlign: 'center', marginTop: '10px' }}
            >
              {name}
            </h4>
            <h1 className='dashboard-hilight' style={{ textAlign: 'center' }}>
              {name === 'Pure Lea 60' ||
              name === 'Pure Lea 44' ||
              name === 'Dastar' ||
              name === 'Cotton Linen' ||
              name === 'Cotton Linen Club' ||
              name === '60×60 Cotton Linen'
                ? total.toFixed(2)
                : total.toFixed(0)}
            </h1>
            <p style={{ textAlign: 'center' }}>
              {name === 'Pure Lea 60' ||
              name === 'Pure Lea 44' ||
              name === 'Dastar' ||
              name === 'Cotton Linen' ||
              name === 'Cotton Linen Club' ||
              name === '60×60 Cotton Linen'
                ? 'meter'
                : 'pcs'}
            </p>
          </div>
        ))}
      </div>
      <div className='table'>
        <h2 style={{ textAlign: 'center' }} className='table-heading'>
          Invoice List
        </h2>
        <div className='table-header'>
          <p className='no'>No</p>
          <p className='s'>Name</p>
          <p className='s'>Campus</p>
          <button className='refresh-button' onClick={fetchData}>
            <IoMdRefresh size={30} className={spinning ? 'spin' : ''} />
          </button>
        </div>

        {orderData &&
          orderData.map((item, index) => {
            return (
              <div className='table-items' key={index}>
                <p className='no'>{index + 1}</p>
                <p className='s'>{item.customerName}</p>
                <p className='s'>{item.campus}</p>

                <button onClick={() => viewBill(item)} className='viewbtn'>
                  Edit
                </button>
                {/* <button onClick={() => printAddress(item)} className='viewbtn'>
                  Print Address
                </button> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}
