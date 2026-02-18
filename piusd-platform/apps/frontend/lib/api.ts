import { API_BASE_URL } from './config';

async function safeJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text || 'Invalid JSON from API');
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    const body = await safeJson<{ error?: string }>(response).catch(() => ({ error: response.statusText }));
    throw new Error(body.error ?? `Request failed (${response.status})`);
  }

  return safeJson<T>(response);
}
