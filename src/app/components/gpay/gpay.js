'use client'
import './gpay.css'
import { useState } from 'react'
import QRCode from 'react-qr-code'

export default function GPayQRCode({ money }) {
  const [amount, setAmount] = useState('')
  const upiId = 'hajunaidcm333@oksbi'
  const name = 'AHAMMED JUNAID'

  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    name
  )}&am=${money}&cu=INR`

  return (
    <div className='gpay-container'>
      <div>
        <h2
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          {name}
        </h2>
        upi id: {upiId}
      </div>
      <div
        style={{
          marginTop: '20px',
          background: 'white',
          padding: '16px',
          display: 'inline-block',
        }}
      >
        <QRCode value={upiLink} size={250} />
      </div>
    </div>
  )
}
