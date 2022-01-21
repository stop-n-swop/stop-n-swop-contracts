import { Merchant } from './entities';

export type GetMerchantResponse = Merchant;

export type GetMerchantsRequest = { outstanding?: boolean };
export type GetMerchantsResponse = { merchants: Merchant[] };

export type UpdateBankDetailsRequest = {
  name: string;
  accountNumber: string;
  sortCode: string;
};
