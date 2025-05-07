'use client'
import './print.css'
import { LuPrinter } from 'react-icons/lu'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Image from 'next/image'

const PrintComponent = (props) => {
  // Create a ref to the content you want to print
  const componentRef = useRef()

  // Set up the print handler
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Pass the ref to react-to-print
  })

  return (
    <div>
      {/* Content to be printed */}
      <div className='printable-content' ref={componentRef}>
        <div className='print-img'>
          {' '}
          <Image
            quality={100}
            priority
            className='print-logo'
            src='/Tajammul-Mart-Logo.png'
            alt='logo'
            width={100}
            height={80}
          />
        </div>

        <div className='p-bill-customer'>
          <div className='bill-customer-details'>
            <p>Invoice : {props.billData?.orderNumber}</p>
            <p>
              Recipient:{' '}
              <span className='bold'>{props.billData?.customerName}</span>
            </p>
            <p>
              Campus:
              <span className='bold'> {props.billData?.campus}</span>
            </p>
          </div>
          <div className='bill-customer-time'>
            <p>
              Date:{' '}
              {props.billData?.createdAt
                ? (() => {
                    const [year, month, day] = props.billData.createdAt
                      .split('T')[0]
                      .split('-')
                    return `${day}-${month}-${year}`
                  })()
                : 'N/A'}
            </p>

            <p>
              Time:{' '}
              {new Date(props.billData?.createdAt).toLocaleTimeString('en-US')}
            </p>
          </div>
        </div>

        <div className='p-bill-deatils'>
          <h2>Invoice</h2>
          <div className='bill-items'>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr>
                  <th className='ts no'>No.</th>
                  <th className='ts item'>Items</th>
                  <th className='ts'>Price</th>
                  <th className='ts'>Qty</th>
                  <th className='ts all'>Total</th>
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
                {props.billData?.cartItems.map((item, index) => (
                  <tr style={{ height: '30px' }} key={index}>
                    <td className='td no'>{index + 1}</td>
                    <td className='td item'>{item.name}</td>
                    <td className='td'>
                      {item.price % 1 === 0
                        ? item.price
                        : item.price.toFixed(2)}
                    </td>
                    <td className='td'>{item.count}</td>
                    <td className='td all'>
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

          <div className='p-bill-total'>
            <div>Grand Total:</div>
            <div>{props.billData?.total}</div>
          </div>
          {/* <p>{props.billData?.paymentStatus}</p>
          <p>{props.billData?.deliveryStatus}</p> */}
        </div>
      </div>

      {/* Button to trigger printing */}
      <button className='print-button' onClick={handlePrint}>
        Print <LuPrinter />
      </button>
    </div>
  )
}

export default PrintComponent
