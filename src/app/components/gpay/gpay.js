'use client'
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
    <div>
      <h2>GPay QR Code Generator</h2>

      <div
        style={{
          marginTop: '20px',
          background: 'white',
          padding: '16px',
          display: 'inline-block',
        }}
      >
        <QRCode value={upiLink} size={150} />
        <p style={{ marginTop: '10px' }}>Scan to pay ₹{money}</p>
      </div>
    </div>
  )
}
