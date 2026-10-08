import 'server-only';
import { createHash, randomBytes, timingSafeEqual, randomUUID } from 'node:crypto';

export const MAX_PLAYERS = 50;
export const ROUND_SECONDS = 25;
export const ROOM_TTL_HOURS = 24;

export function makeToken() { return randomBytes(32).toString('hex'); }
export function hashToken(token: string) { return createHash('sha256').update(token).digest('hex'); }
export function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function isHostPasscode(value: unknown) {
  const expected = process.env.LIVE_HOST_PASSCODE;
  return typeof value === 'string' && !!expected && expected.length >= 12 && safeEqual(value, expected);
}
export function isRoomCode(code: string) { return /^[A-Z0-9]{6}$/.test(code); }
export function normalizeName(v: unknown) {
  if (typeof v !== 'string') return '';
  const value = v.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim();
  return value.length >= 2 && value.length <= 30 ? value : '';
}
export function newPlayerId() { return randomUUID(); }
export function hostTokenFrom(req: Request) {
  const h = req.headers.get('authorization') ?? '';
  return /^Bearer [0-9a-f]{64}$/.test(h) ? h.slice(7) : '';
}
export function json(body: unknown, status=200) {
  return Response.json(body,{status,headers:{'Cache-Control':'no-store, max-age=0','X-Content-Type-Options':'nosniff'}});
}
export function errorResponse(err: unknown) {
  console.error('Live quiz API failed:', err instanceof Error ? err.message : 'unknown error');
  return json({error:'The live server is temporarily unavailable.'},503);
}
