'use client'

import './style.css'
import { FaCartShopping } from 'react-icons/fa6'

const data = [
  {
    _id: 1,
    name: 'Junior Kit (8th)',
    img: '/kit-pre.jpg',
    description: '10 Kithab + 10 Notebook',
    price: 1300,
  },
  {
    _id: 2,
    name: 'Senior Kit (+1)',
    description: '11 Kithab + 10 Notebook',

    img: '/kit-sec.jpg',
    price: 1450,
  },
  {
    _id: 3,
    name: 'Notebook',
    description: 'JMN Notebook',

    img: '/note.jpg',
    price: 45,
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
