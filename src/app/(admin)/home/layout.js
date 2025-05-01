// layout.js
'use client'
import { Inter } from 'next/font/google'
import './homeLayout.css'
import FeaturedProduct from './featuredProducts/page'
import AllProducts from './allProducts/page'
import Cart from './cart/page'
import { useState } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function HomeLayout({ children }) {
  const [cartItem, setCartItem] = useState([])

  const addToCart = (item) => {
    const cartItems = cartItem.slice() // Assuming `cart` is a state variable
    let alreadyInCart = false

    cartItems.forEach((cartItem) => {
      if (cartItem._id === item._id) {
        cartItem.count++
        alreadyInCart = true
      }
    })

    if (!alreadyInCart) {
      cartItems.push({ ...item, count: 1 })
    }

    setCartItem(cartItems)
  }

  const removeFromCart = (indexToRemove) => {
    setCartItem((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  console.log(cartItem)

  return (
    <div className='home-layout'>
      {/* <div className='parent'> */}
      <div className='home-layout-left'>
        <FeaturedProduct addToCart={addToCart} />
        <AllProducts addToCart={addToCart} />
      </div>

      <div className='home-layout-right'>
        <Cart cartItems={cartItem} removeFromCart={removeFromCart} />
      </div>
    </div>
    // </div>
  )
}
