'use client'
import './print.css'
import { LuPrinter } from 'react-icons/lu'
import { FaMapMarkerAlt } from 'react-icons/fa'

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
        {/* <div className='print-img'>
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
        </div> */}
        <div className='from-address' style={{ fontSize: '2.2rem' }}>
          <h3>From</h3>

          <p className='bold'>Tajammul Mart</p>

          <p>
            Markaz Garden, Poonoor, Unnikkulam PO, Kozhikkode, Kerala, 673574
            <br />
            Phone: 92071 19168
          </p>
        </div>

        <br />
        <br />

        <div className='from-address' style={{ fontSize: '2.2rem' }}>
          <h3>To</h3>
          <p className='bold cu-name'>{props.billData?.customerName}</p>
          <p>
            {props.billData?.address &&
              props.billData.address
                .toLocaleLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
          </p>
        </div>
      </div>

      <button className='print-button' onClick={handlePrint}>
        <FaMapMarkerAlt />
      </button>
    </div>
  )
}

export default PrintComponent
