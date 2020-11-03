import { platform } from 'os';

export function emoji(text: string, fallback?: string) {
  if (platform() === 'win32') {
    return fallback || '◆';
  }
  return text;
}
