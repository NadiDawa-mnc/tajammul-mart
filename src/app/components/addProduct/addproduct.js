'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState()
  const [img, setImg] = useState('')
  const [stock, setStock] = useState('')
  const router = useRouter()

  const handleClick = async () => {
    let result = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({ name, description, price, img, stock }),
      headers: {
        'Content-Type': 'application/json',
      }, // Add content-type header to specify JSON
    })
    result = await result.json()

    router.push('/home')
  }

  return (
    <div>
      <h1>AddProduct</h1>
      <div>
        <input
          value={name}
          type='text'
          onChange={(e) => setName(e.target.value)}
          placeholder='name'
        />

        <input
          value={description}
          type='text'
          onChange={(e) => setDescription(e.target.value)}
          placeholder='description Name'
        />

        <input
          value={price}
          type='Number'
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price'
        />

        <input
          value={img}
          type='text'
          onChange={(e) => setImg(e.target.value)}
          placeholder='image url'
        />
        <input
          value={stock}
          type='text'
          onChange={(e) => setStock(e.target.value)}
          placeholder='stock'
        />

        <button onClick={handleClick}>Add Product</button>
      </div>
    </div>
  )
}
