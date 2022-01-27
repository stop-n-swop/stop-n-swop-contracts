export interface Merchant {
  id: string;
  username: string;
  onboarded: boolean;
  balance: number;
  currency: string;
  accountNumber: string;
}

export interface MerchantAccount {
  merchantId: string;
  name: string;
  balance: number;
  outgoingBalance: number;
  currency: string;
  accountNumber: string;
  sortCode: string;
}
