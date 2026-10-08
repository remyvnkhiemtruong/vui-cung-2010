import 'server-only';
import { neon } from '@neondatabase/serverless';

export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL has not been configured for the Live Quiz');
  return neon(url, { fullResults: false });
}
