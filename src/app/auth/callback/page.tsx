'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleCallback } from '@/services/blueskyAuth';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function processCallback() {
      try {
        const { session } = await handleCallback(searchParams);
        router.push('/');
      } catch (error) {
        console.error('Error handling callback:', error);
        router.push('/login');
      }
    }

    processCallback();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Processing login...</p>
    </div>
  );
}
