export interface Merchant {
  id: string;
  username: string;
  onboarded: boolean;
  balance: number;
  currency: string;
  accountNumber: string;
  withdrawals: number[];
}

export interface MerchantAccount {
  merchantId: string;
  name: string;
  balance: number;
  currency: string;
  accountNumber: string;
  sortCode: string;
}

export interface Payout {
  merchantId: string;
  amount: number;
}
