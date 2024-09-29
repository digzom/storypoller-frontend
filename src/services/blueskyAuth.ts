export async function initiateAuth() {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'initiateAuth' }),
  });
  if (!response.ok) {
    throw new Error('Failed to initiate auth');
  }
  return response.json();
}

export async function handleCallback(params: URLSearchParams) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'handleCallback', params: params.toString() }),
  });
  if (!response.ok) {
    throw new Error('Failed to handle callback');
  }
  const { session } = await response.json();
  localStorage.setItem(`bluesky_session_${session.did}`, JSON.stringify(session));
  return { session };
}

export function getSession(did: string): any | null {
  const sessionData = localStorage.getItem(`bluesky_session_${did}`);
  return sessionData ? JSON.parse(sessionData) : null;
}

export function removeSession(did: string): void {
  localStorage.removeItem(`bluesky_session_${did}`);
}

export async function restoreSession(userDid: string) {
  const session = getSession(userDid);
  if (session) {
    // Here you might want to check if the session is still valid
    // and refresh it if necessary
    return session;
  }
  return null;
}
