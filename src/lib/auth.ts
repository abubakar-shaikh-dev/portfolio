import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

/**
 * Auth primitives for the single-admin panel — pure functions only (no
 * next/headers), so both server actions and edge middleware can use them.
 *
 * Session: HS256 JWT in an http-only cookie, 7-day expiry.
 * Credentials: ADMIN_EMAIL + ADMIN_PASSWORD from env; prefer
 * ADMIN_PASSWORD_HASH (bcrypt) when present.
 */

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export interface AdminSession {
  email: string;
}

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('[auth] AUTH_SECRET is missing or too short (min 16 chars).');
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub) return null;
    return { email: payload.sub };
  } catch {
    return null;
  }
}

/** Timing-safe credential check. Warns loudly while only the plaintext env password is configured. */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || '';
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || '';

  const emailOk = expectedEmail.length > 0 && email.trim().toLowerCase() === expectedEmail;
  if (!emailOk) {
    // burn comparable time so email-vs-password failures are indistinguishable
    await bcrypt.compare(password, '$2a$10$C6UzMDM.H6dfI/f/IKcEeO7ZBpEyR2eKok4R0pZ.NF1T0tOo!.Em6');
    return false;
  }

  if (expectedHash) {
    return bcrypt.compare(password, expectedHash);
  }

  if (!expectedPassword) {
    console.warn('[auth] ADMIN_PASSWORD/ADMIN_PASSWORD_HASH not configured — login disabled.');
    return false;
  }

  if (process.env.NODE_ENV === 'production') {
    console.warn('[auth] Using plaintext ADMIN_PASSWORD — set ADMIN_PASSWORD_HASH instead.');
  }

  // Compare through bcrypt so failures cost the same as hashed validation.
  return bcrypt.compare(password, bcrypt.hashSync(expectedPassword, 10));
}
