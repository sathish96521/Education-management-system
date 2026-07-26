// Simulates async API calls with a configurable delay.
// Replace these with real fetch/axios calls when connecting a backend.

const SIMULATED_DELAY = 400;

function delay(ms = SIMULATED_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiGet<T>(data: T): Promise<T> {
  await delay();
  return structuredClone(data);
}

export async function apiCreate<T extends { id: string }>(
  list: T[],
  item: Omit<T, 'id'>
): Promise<T> {
  await delay();
  const newItem = { ...item, id: crypto.randomUUID() } as T;
  list.push(newItem);
  return structuredClone(newItem);
}

export async function apiUpdate<T extends { id: string }>(
  list: T[],
  id: string,
  updates: Partial<T>
): Promise<T> {
  await delay();
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) throw new Error('Item not found');
  list[idx] = { ...list[idx], ...updates };
  return structuredClone(list[idx]);
}

export async function apiDelete<T extends { id: string }>(
  list: T[],
  id: string
): Promise<void> {
  await delay();
  const idx = list.findIndex((item) => item.id === id);
  if (idx === -1) throw new Error('Item not found');
  list.splice(idx, 1);
}
