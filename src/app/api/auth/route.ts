import { NextRequest, NextResponse } from "next/server";
import {
  NodeOAuthClient,
  NodeOAuthClientOptions,
} from "@atproto/oauth-client-node";
import { cookies } from "next/headers";
import * as jose from "jose";

const CLIENT_ID = process.env.NEXT_PUBLIC_BLUESKY_CLIENT_ID || "";
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

let keyPair: jose.GenerateKeyPairResult | null = null;
let client: NodeOAuthClient | null = null;

async function getOrCreateKeyPair() {
  if (!keyPair) {
    keyPair = await jose.generateKeyPair("ES256");
  }
  return keyPair;
}

async function createKeyset() {
  const { privateKey } = await getOrCreateKeyPair();
  const jwk = await jose.exportJWK(privateKey);
  return [
    {
      ...jwk,
      kid: "key1",
      alg: "ES256",
    },
  ];
}

async function getClient() {
  if (client) return client;

  const clientOptions: NodeOAuthClientOptions = {
    clientMetadata: {
      client_id: CLIENT_ID,
      client_name: "Your App Name",
      redirect_uris: [REDIRECT_URI],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "private_key_jwt",
      dpop_bound_access_tokens: true,
      scope: "atproto",
      token_endpoint_auth_signing_alg: "ES256",
    },
    jwksUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
    keyset: await createKeyset(),
    stateStore: {
      set: async (key: string, value: any) => {
        cookies().set(key, JSON.stringify(value), {
          httpOnly: true,
          secure: true,
          maxAge: 600,
        });
      },
      get: async (key: string) => {
        const value = cookies().get(key);
        return value ? JSON.parse(value.value) : undefined;
      },
      del: async (key: string) => {
        cookies().delete(key);
      },
    },
    sessionStore: {
      set: async (_sub: string, _session: any) => {
        // We'll handle this on the client side
      },
      get: async (_sub: string) => {
        // We'll handle this on the client side
        return undefined;
      },
      del: async (_sub: string) => {
        // We'll handle this on the client side
      },
    },
  };

  client = new NodeOAuthClient(clientOptions);
  return client;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action } = body;
  const client = await getClient();

  if (action === "initiateAuth") {
    try {
      const handle = "cyberproblem.com.br";
      const state = Math.random().toString(36).substring(7);
      const url = await client.authorize(handle, { state });
      return NextResponse.json({ url, state });
    } catch (error) {
      console.error("Failed to initiate auth:", error);
      return NextResponse.json(
        { error: "Failed to initiate auth" },
        { status: 500 },
      );
    }
  } else if (action === "handleCallback") {
    try {
      const { session } = await client.callback(
        new URLSearchParams(body.params),
      );
      return NextResponse.json({ session });
    } catch (error) {
      console.error("Failed to handle callback:", error);
      return NextResponse.json(
        { error: "Failed to handle callback" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }
}

export async function GET() {
  const { publicKey } = await getOrCreateKeyPair();
  const jwk = await jose.exportJWK(publicKey);
  const jwks = {
    keys: [
      {
        ...jwk,
        kid: "key1",
        use: "sig",
        alg: "ES256",
      },
    ],
  };
  return NextResponse.json(jwks);
}
