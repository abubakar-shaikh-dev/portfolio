export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  receivedAt: string;
  read: boolean;
}
