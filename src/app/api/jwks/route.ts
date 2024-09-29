import { NextResponse } from "next/server";
import { getClient } from "../../../utils/oauthClient";

export async function GET() {
  try {
    const client = await getClient();
    return NextResponse.json(client.jwks);
  } catch (error) {
    console.error("Failed to get JWKS:", error);
    return NextResponse.json(
      { error: "Failed to get JWKS" },
      { status: 500 }
    );
  }
}
