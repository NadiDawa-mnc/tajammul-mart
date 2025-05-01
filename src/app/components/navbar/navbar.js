'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import './nav.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar({ NavLinks }) {
  // Destructure here!
  const pathname = usePathname()
  const [userDetails, setUserDetails] = useState()
  const router = useRouter()

  useEffect(() => {
    let user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
    } else if (!user && pathname !== '/login') {
      router.push('/login')
    } else {
      setUserDetails(JSON.parse(user))
      console.log(userDetails)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <nav className='nav'>
      <div className='logo-container'>
        <Image
          src='/Tajammul-Mart-Logo.png'
          alt='logo'
          width={190}
          height={70}
        />
      </div>
      <ul className='link-container'>
        {NavLinks.map((link) => {
          const isActive = link.href === pathname
          return (
            <li className='links' key={link.href}>
              <Link
                href={link.href}
                className={isActive ? 'elink active' : 'elink'}
              >
                {link.label}
              </Link>
            </li>
          )
        })}

        {/* <button onClick={logout} className='logoOutbtn'>
          Logo Out
        </button> */}

        <h2 className='username'>{userDetails?.username}</h2>
      </ul>
    </nav>
  )
}
