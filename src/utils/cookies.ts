'use server';

import { cookies } from 'next/headers';

export async function getCookie(name: string) {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();

  return cookieStore.delete(name);
}
