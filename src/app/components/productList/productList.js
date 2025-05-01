'use client'
import { useEffect, useState } from 'react'

export default function ProductList() {
  const [productData, setProductData] = useState()

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    let response = await fetch('/api/products')
    response = await response.json()
    console.log(response)
    if (response.success) {
      setProductData(response.result)
    }
  }

  return (
    <div>
      <h1>ProductList</h1>
      {productData &&
        productData.map((items, index) => <div key={index}>{items.name}</div>)}
    </div>
  )
}
