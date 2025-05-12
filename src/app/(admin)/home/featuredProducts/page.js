'use client'

import './style.css'
import { FaCartShopping } from 'react-icons/fa6'

const data = [
  {
    _id: 1,
    name: 'Premium Kit',
    img: '/kit-pre.jpg',
    description: '6 Kithab+10 Notebook',
    price: 1560,
  },
  {
    _id: 2,
    name: 'Secondary Kit',
    description: '6 Kithab Only',

    img: '/kit-sec.jpg',
    price: 1060,
  },
  {
    _id: 3,
    name: 'Notebook',
    description: 'JMN Notebook',

    img: '/note.jpg',
    price: 40,
  },
]

import Image from 'next/image'
export default function FeaturedProduct({ addToCart }) {
  return (
    <div className='feature-container'>
      <p className='feature-title'>Featured Products</p>

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

                <h3 className='product-price'> ₹{item.price}</h3>
              </div>

              <button className='addToCart-btn' onClick={() => addToCart(item)}>
                <FaCartShopping size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
