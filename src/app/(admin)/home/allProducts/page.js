// allproduct/page.js
'use client'
import { FaCartShopping } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import './allProducts.css'
import Image from 'next/image'

export default function AllProducts({ addToCart }) {
  const [productData, setProductData] = useState([])

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    let response = await fetch('/api/products')
    response = await response.json()
    if (response.success) {
      setProductData(response.result)
    }
  }

  return (
    <div className='allproduct-container'>
      <div className='allproduct-product-conatiner'>
        {productData.length > 0
          ? productData.map((item, index) => {
              let strikePrice = item.price + item.price * 0.1
              return (
                <div key={index} className='allproduct-product'>
                  <Image
                    className='allproduct-image'
                    src={item.img}
                    alt={item.name}
                    width={90}
                    height={100}
                  />
                  <div className='allproduct-details'>
                    <div>
                      <h2 className='allproduct-name'>{item.name}</h2>
                      <p className='allproduct-desc'> {item.description}</p>
                      <p className='allproduct-qty'> Qty: {item.stock}</p>
                    </div>

                    <div className='btm'>
                      <div className='allproduct-price'>
                        <h3 className='allproduct-price-f'> ₹{strikePrice}</h3>
                        <h3 className='allproduct-price'> ₹{item.price}</h3>
                      </div>
                      <button
                        className='alladdToCart-btn'
                        onClick={() => addToCart(item)}
                      >
                        <FaCartShopping size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          : 'No data'}
      </div>
    </div>
  )
}
