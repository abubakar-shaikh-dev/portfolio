import { fetchCollection } from '@/lib/db';
import type { ContactMessage } from '@/data/types/message.types';

/**
 * Contact submissions. There is no JSON fallback for messages — the inbox
 * simply shows nothing until the database holds them.
 */
export async function getAllMessages(): Promise<ContactMessage[]> {
  return fetchCollection<ContactMessage>('messages', [], { sort: { receivedAt: -1 } });
}
