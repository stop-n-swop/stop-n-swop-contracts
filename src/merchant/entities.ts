export interface Merchant {
  id: string;
  username: string;
  onboarded: boolean;
  name: string;
  balance: number;
  outgoingBalance: number;
  currency: string;
  accountNumber: string;
  sortCode: string;
}
