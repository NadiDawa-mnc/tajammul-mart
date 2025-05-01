// app/home/layout.js
'use client'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function HomeLayout({ children }) {
  return (
    <html className={inter.className}>
      <body>
        <div className='login-layout'>{children}</div>
      </body>
    </html>
  )
}
