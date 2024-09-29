import { NextRequest, NextResponse } from "next/server";
import { Agent } from "@atproto/api";
import { getClient } from "../../../utils/oauthClient";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action } = body;
  const client = await getClient();

  if (action === "initiateAuth") {
    try {
      const handle = body.handle || "cyberproblem.com.br";
      const state = Math.random().toString(36).substring(7);
      const url = await client.authorize(handle, { state });
      return NextResponse.json({ url, state });
    } catch (error) {
      console.error("Failed to initiate auth:", error);
      return NextResponse.json(
        { error: "Failed to initiate auth" },
        { status: 500 }
      );
    }
  } else if (action === "callback") {
    try {
      const { session } = await client.callback(new URLSearchParams(body.params));
      const agent = new Agent({ session });
      const profile = await agent.getProfile({ actor: agent.session?.did });
      return NextResponse.json({ success: true, profile: profile.data });
    } catch (error) {
      console.error("Failed to handle callback:", error);
      return NextResponse.json(
        { error: "Failed to handle callback" },
        { status: 500 }
      );
    }
  } else if (action === "getProfile") {
    try {
      const { did } = body;
      const session = await client.restore(did);
      const agent = new Agent({ session });
      const profile = await agent.getProfile({ actor: agent.session?.did });
      return NextResponse.json({ success: true, profile: profile.data });
    } catch (error) {
      console.error("Failed to get profile:", error);
      return NextResponse.json(
        { error: "Failed to get profile" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}
