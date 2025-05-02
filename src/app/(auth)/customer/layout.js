'use client'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html className={inter.className} lang='en'>
      <body>{children}</body>
    </html>
  )
}
