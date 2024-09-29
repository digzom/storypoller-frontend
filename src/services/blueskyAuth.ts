import { AtpAgent, AtpSessionEvent, AtpSessionData } from "@atproto/api";

const BLUESKY_SERVICE = "https://bsky.social";

export class BlueskyAuth {
  public agent: AtpAgent;

  constructor() {
    this.agent = new AtpAgent({
      service: BLUESKY_SERVICE,
      persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
        if (evt === "create" || evt === "update") {
          console.log("claro que entra");
          localStorage.setItem("bluesky-session", JSON.stringify(sess));
        } else if (evt === "expired") {
          localStorage.removeItem("bluesky-session");
        }
      },
    });
  }

  async login(identifier: string, password: string) {
    const { success, data } = await this.agent.login({ identifier, password });
    if (success) {
      return data;
    }
    throw new Error("Login failed");
  }

  async resumeSession() {
    const savedSession = localStorage.getItem("bluesky-session");
    if (savedSession) {
      const sessionData = JSON.parse(savedSession) as AtpSessionData;
      await this.agent.resumeSession(sessionData);
    }
  }
}

export const blueskyAuth = new BlueskyAuth();
