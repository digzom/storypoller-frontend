'use client';

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { blueskyAuth } from '../../../services/blueskyAuth'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function handleCallback() {
      const code = searchParams.get('code')
      if (code) {
        try {
          const session = await blueskyAuth.handleCallback(code)
          // Store the session data securely
          // Redirect to a logged-in page
          router.push('/')
        } catch (error) {
          console.error('Login failed', error)
          router.push('/login')
        }
      }
    }
    handleCallback()
  }, [router, searchParams])

  return <div>Completing login...</div>
}
