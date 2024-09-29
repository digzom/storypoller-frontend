import { NextResponse } from 'next/server';
import * as jose from 'jose';

const generateKeyPair = async () => {
  const keyPair = await jose.generateKeyPair('ES256');
  const publicKey = await jose.exportJWK(keyPair.publicKey);
  return publicKey;
};

const createJWKS = async () => {
  const publicKey = await generateKeyPair();
  return {
    keys: [
      {
        ...publicKey,
        use: 'sig',
        alg: 'ES256',
        kid: 'key1',
      },
    ],
  };
};

export async function GET() {
  const jwks = await createJWKS();
  return NextResponse.json(jwks);
}
