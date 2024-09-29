import {
  NodeOAuthClient,
  NodeOAuthClientOptions,
} from "@atproto/oauth-client-node";
import { JoseKey } from "@atproto/jwk-jose";
import * as jose from "jose";
import fs from "fs/promises";
import path from "path";

const CLIENT_ID = process.env.NEXT_PUBLIC_BLUESKY_CLIENT_ID || "";
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;
const STORAGE_DIR = path.join(process.cwd(), "storage");

let client: NodeOAuthClient | null = null;

async function ensureStorageDir() {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
}

async function getOrCreateKeyPair() {
  const keyPairPath = path.join(STORAGE_DIR, "keypair.json");
  try {
    const keyPairData = await fs.readFile(keyPairPath, "utf-8");
    const { publicKey, privateKey } = JSON.parse(keyPairData);
    return {
      publicKey: await jose.importJWK(publicKey, "ES256"),
      privateKey: await jose.importJWK(privateKey, "ES256"),
    };
  } catch (error) {
    const keyPair = await jose.generateKeyPair("ES256");
    const keyPairData = {
      publicKey: await jose.exportJWK(keyPair.publicKey),
      privateKey: await jose.exportJWK(keyPair.privateKey),
    };
    await fs.writeFile(keyPairPath, JSON.stringify(keyPairData));
    return keyPair;
  }
}

async function createKeyset() {
  const { privateKey } = await getOrCreateKeyPair();
  const jwk = await jose.exportJWK(privateKey);

  const keyWithKid = {
    ...jwk,
    kid: "key1", // You can use any unique identifier here
    alg: "ES256", // Make sure this matches your key algorithm
  };

  return [await JoseKey.fromImportable(keyWithKid)];
}

export async function getClient() {
  if (client) return client;

  await ensureStorageDir();

  const clientOptions: NodeOAuthClientOptions = {
    clientMetadata: {
      client_id: "http://localhost",
      client_name: "StoryPoller",
      redirect_uris: ["http://127.0.0.1/"],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "native",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
      scope: "atproto",
    },
    keyset: await createKeyset(),
    stateStore: {
      set: async (key: string, value: any) => {
        const filePath = path.join(STORAGE_DIR, `state_${key}.json`);
        await fs.writeFile(filePath, JSON.stringify(value));
      },
      get: async (key: string) => {
        const filePath = path.join(STORAGE_DIR, `state_${key}.json`);
        try {
          const data = await fs.readFile(filePath, "utf-8");
          return JSON.parse(data);
        } catch (error) {
          return undefined;
        }
      },
      del: async (key: string) => {
        const filePath = path.join(STORAGE_DIR, `state_${key}.json`);
        await fs.unlink(filePath).catch(() => {}); // Ignore if file doesn't exist
      },
    },
    sessionStore: {
      set: async (sub: string, session: any) => {
        const filePath = path.join(STORAGE_DIR, `session_${sub}.json`);
        await fs.writeFile(filePath, JSON.stringify(session));
      },
      get: async (sub: string) => {
        const filePath = path.join(STORAGE_DIR, `session_${sub}.json`);
        try {
          const data = await fs.readFile(filePath, "utf-8");
          return JSON.parse(data);
        } catch (error) {
          return undefined;
        }
      },
      del: async (sub: string) => {
        const filePath = path.join(STORAGE_DIR, `session_${sub}.json`);
        await fs.unlink(filePath).catch(() => {}); // Ignore if file doesn't exist
      },
    },
  };

  client = new NodeOAuthClient(clientOptions);
  return client;
}
