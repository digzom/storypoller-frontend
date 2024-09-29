import { useEffect, useState } from "react";
import { blueskyAuth } from "./blueskyAuth";
import { AtpAgent } from "@atproto/api";

export function useBluesky() {
  const [agent, setAgent] = useState<AtpAgent | null>(null);

  useEffect(() => {
    async function initAgent() {
      await blueskyAuth.resumeSession();
      setAgent(blueskyAuth.agent);
    }

    initAgent();
  }, []);

  return agent;
}
