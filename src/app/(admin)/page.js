'use client'
import { useState } from 'react'
import FeaturedDress from '../components/FeaturedDress/FeaturedDress'
import AllProducts from './home/allProducts/page'
import Cart from './home/cart/page'
import FeaturedProduct from './home/featuredProducts/page'
import './home/homeLayout.css'
import './hero.css'
import AllDress from '../components/allDress/allDress'

export default function Hero() {
  const defaultMeters = {
    1: 1,
    2: 1,
    3: 4,
    4: 1,
    5: 1.8,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
  }
  const [cartItem, setCartItem] = useState([])
  const [meters, setMeters] = useState(defaultMeters)

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
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const addToCartMeter = (item, length) => {
    if (!length || Number(length) <= 0) {
      alert('Please enter a valid length.')
      return
    }

    const cartItems = cartItem.slice()
    let alreadyInCart = false

    cartItems.forEach((cartItem) => {
      if (cartItem._id === item._id) {
        alreadyInCart = true
      }
    })

    if (!alreadyInCart) {
      cartItems.push({ ...item, count: Number(length) })
    }

    setCartItem(cartItems)
    console.log(cartItems)
    setMeters((prev) => ({
      ...prev,
      [item._id]: 1,
    }))
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const removeFromCart = (indexToRemove) => {
    setCartItem((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  console.log(cartItem)
  return (
    <main>
      <div className='home-layout'>
        {/* <div className='parent'> */}
        <div className='home-layout-left'>
          <FeaturedDress
            meters={meters}
            setMeters={setMeters}
            addToCartMeter={addToCartMeter}
          />
          <AllDress addToCart={addToCart} />
        </div>

        <div className='home-layout-right'>
          <Cart cartItems={cartItem} removeFromCart={removeFromCart} />
        </div>

        {/* <div className='meter-box'>
          <p>Meter</p>
          <input
            type='number'
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
          />
        </div> */}
      </div>
    </main>
  )
}
