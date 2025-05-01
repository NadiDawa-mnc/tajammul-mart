'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import './login.css'
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    if (!username || !password) {
      setError(true)
      return false
    } else {
      setError(false)
    }
    let response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      }, // Add content-type header to specify JSON
    })
    response = await response.json()

    if (response.success) {
      const { result } = response
      delete result.password

      localStorage.setItem('user', JSON.stringify(result))
      router.push('/home')
    } else {
      alert('failed to Login')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-logo-container'>
        <Image
          src='/Tajammul-Mart-Logo.png'
          alt='logo'
          width={190}
          height={70}
        />
      </div>
      <div>
        <div className='login-input-container'>
          <h1>Login</h1>
          <input
            className='input'
            value={username}
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
          />
          {error && !username && (
            <span className='error' style={{ color: 'red' }}>
              -enter valid username
            </span>
          )}
        </div>

        <div className='login-input-container'>
          <input
            className='input'
            value={password}
            type='text'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
          {error && !password && (
            <span className='error' style={{ color: 'red' }}>
              -enter valid password
            </span>
          )}
        </div>

        <button className='login-btn' onClick={handleClick}>
          Login
        </button>
      </div>

      <div className='copyright'> &#169; Nadi Dawa 2024-2025</div>
    </div>
  )
}
