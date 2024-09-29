import { useState, useEffect } from 'react';
import { Agent } from '@atproto/api';
import { restoreSession } from '@/services/blueskyAuth';

export function useBluesky() {
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    async function initializeAgent() {
      const storedSession = localStorage.getItem('blueskySession');
      if (storedSession) {
        const session = JSON.parse(storedSession);
        try {
          const restoredSession = await restoreSession(session.did);
          const newAgent = new Agent(restoredSession);
          setAgent(newAgent);
        } catch (error) {
          console.error('Error restoring session:', error);
          localStorage.removeItem('blueskySession');
        }
      }
    }

    initializeAgent();
  }, []);

  return agent;
}
