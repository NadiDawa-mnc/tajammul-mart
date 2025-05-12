'use client'
import { useState } from 'react'

import { FaCartShopping } from 'react-icons/fa6'

const premium = [
  {
    _id: 1,
    name: 'Pure Lea 60',
    img: '/PureLea60.jpg',
    description: 'Kurtha Cloth',
    price: 650,
  },
  {
    _id: 2,
    name: 'Pure Lea 44',
    description: 'Kurtha Cloth',

    img: '/PureLea44.jpg',

    price: 550,
  },
  {
    _id: 3,
    name: 'Dastar',
    description: 'Nurani',
    img: '/qurbani.jpg',
    price: 85,
  },
]

const data = [
  {
    _id: 4,
    name: 'Cotton Linen',
    img: '/linen.jpg',
    description: 'Kurtha Cloth',
    price: 320,
  },
  {
    _id: 5,
    name: 'Cotton Linen Club',
    description: 'Kurtha Cloth',

    img: '/linen-club.jpg',
    price: 300,
  },
  {
    _id: 6,
    name: '60×60 Cotton Linen',
    description: 'Kurtha Cloth',

    img: '/60x60.jpg',
    price: 280,
  },
]

import Image from 'next/image'
export default function FeaturedDress({ addToCartMeter, meters, setMeters }) {
  return (
    <>
      <div className='feature-container'>
        <p className='feature-title'> Premimum Quality</p>

        <div className='feature-product-conatiner'>
          {premium.map((item, index) => (
            <div key={index} className='feature-product'>
              <div className='product-image'>
                <Image
                  className='allproduct-image'
                  src={item.img}
                  alt='Picture of the author'
                  width={90}
                  height={100}
                />
              </div>

              <div className='product-details'>
                <div className='tab-view'>
                  <h2 className='product-name'>{item.name}</h2>
                  <span className='product-desc'>{item.description}</span>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {' '}
                    <h3 className='product-price'> ₹{item.price} </h3>
                    <p className='perMeter'>per meter</p>
                  </div>
                </div>
                <div className='btm'>
                  <input
                    className='meter-btn'
                    type='number'
                    value={meters[item._id] ?? 1}
                    placeholder='Enter Length'
                    onChange={(e) =>
                      setMeters({ ...meters, [item._id]: e.target.value })
                    }
                  />
                  <button
                    className='alladdToCart-btn'
                    onClick={() => addToCartMeter(item, meters[item._id])}
                  >
                    <FaCartShopping size={18} />
                  </button>
                </div>
                {/* <button
                  className='addToCart-btn'
                  onClick={() => addToCart(item)}
                >
                  <FaCartShopping size={18} />
                  Add to Cart
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className='feature-container'
        style={{ marginTop: '1rem', backgroundColor: '#fea9005a' }}
      >
        <p className='feature-title'> Standard Quality</p>

        <div className='feature-product-conatiner'>
          {data.map((item, index) => (
            <div key={index} className='feature-product'>
              <div className='product-image'>
                <Image
                  className='allproduct-image'
                  src={item.img}
                  alt='Picture of the author'
                  width={90}
                  height={100}
                />
              </div>

              <div className='product-details'>
                <div className='tab-view'>
                  <h2 className='product-name'>{item.name}</h2>
                  <span className='product-desc'>{item.description}</span>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {' '}
                    <h3 className='product-price'> ₹{item.price} </h3>
                    <p className='perMeter'>per meter</p>
                  </div>
                </div>

                <div className='btm'>
                  <input
                    className='meter-btn'
                    type='number'
                    value={meters[item._id] ?? 1}
                    placeholder='Enter Length'
                    onChange={(e) =>
                      setMeters({ ...meters, [item._id]: e.target.value })
                    }
                  />
                  <button
                    className='alladdToCart-btn'
                    onClick={() => addToCartMeter(item, meters[item._id])}
                  >
                    <FaCartShopping size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
