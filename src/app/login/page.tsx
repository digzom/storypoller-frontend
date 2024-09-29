'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initiateAuth } from '@/services/blueskyAuth';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleLogin() {
      try {
        const { url } = await initiateAuth();
        router.push(url);
      } catch (error) {
        console.error('Error initiating auth:', error);
      }
    }

    handleLogin();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to Bluesky login...</p>
    </div>
  );
}
