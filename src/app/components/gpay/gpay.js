'use client'

import './gpay.css'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { SlArrowRight } from 'react-icons/sl'
import { SlArrowLeft } from 'react-icons/sl'

const gpayData = [
  { no: 1, name: 'AHAMMED JUNAID', upiId: 'hajunaidcm333@oksbi' },
  { no: 2, name: 'AHAMMED JUNAID', upiId: '9207119168@cnrb' },
  { no: 3, name: 'MUHAMMED YASEEN C A', upiId: '916238288691@federal' },
  { no: 4, name: 'MUHAMMED YASEEN C A', upiId: '6238288691@jupiteraxis' },
]

export default function GPayQRCode({ money }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const total = gpayData.length

  const next = () => {
    setSelectedIndex((prev) => (prev + 1) % total)
  }

  const prev = () => {
    setSelectedIndex((prev) => (prev - 1 + total) % total)
  }

  const selected = gpayData[selectedIndex]
  const upiLink = `upi://pay?pa=${selected.upiId}&pn=${encodeURIComponent(
    selected.name
  )}&am=${money}&cu=INR`

  return (
    <div className='gpay-container'>
      <h2>GPay QR Code</h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <button
          onClick={prev}
          style={{
            padding: '7px 5px 5px 5px',
            background: 'white',
            border: 'none',
            borderRadius: '2px',
          }}
        >
          <SlArrowLeft />
        </button>

        <div>
          <h3 style={{ margin: 0, textAlign: 'center' }}>{selected.name}</h3>
          <p style={{ margin: 0 }}>UPI ID: {selected.upiId}</p>
        </div>

        <button
          style={{
            padding: '7px 5px 5px 5px',
            background: 'white',
            border: 'none',
            borderRadius: '2px',
          }}
          onClick={next}
        >
          <SlArrowRight />
        </button>
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
