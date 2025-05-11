'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import './nav.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaRegUser } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'

export default function Navbar({ NavLinks }) {
  const pathname = usePathname()
  const [userDetails, setUserDetails] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/login')
    } else {
      const parsedUser = JSON.parse(user)
      setUserDetails(parsedUser)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const getFilteredNavLinks = () => {
    if (!userDetails?.username) return []

    const { username } = userDetails

    if (username === 'admin') {
      return NavLinks // full access
    } else if (['counter01', 'counter02', 'counter03'].includes(username)) {
      return NavLinks.filter((link) =>
        ['/', '/home', '/order'].includes(link.href)
      )
    } else if (username === 'counter04') {
      return NavLinks.filter((link) => ['/', '/order'].includes(link.href))
    } else {
      return [] // default: no access
    }
  }

  const filteredNavLinks = getFilteredNavLinks()

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
        {filteredNavLinks.map((link) => {
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
        <h2 className='username'>
          <FaRegUser />
          {userDetails?.username}
        </h2>
        <p className='logout'>
          <IoLogOutOutline size={30} onClick={logout} />
        </p>
      </ul>
    </nav>
  )
}
