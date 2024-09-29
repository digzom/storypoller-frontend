'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { blueskyAuth } from '../../services/blueskyAuth'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await blueskyAuth.login(identifier, password)
      router.push('/')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Username or email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login with Bluesky</button>
    </form>
  )
}
