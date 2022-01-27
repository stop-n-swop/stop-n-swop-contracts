import { Merchant, MerchantAccount } from './entities';

export type GetMerchantResponse = Merchant;

export type GetMerchantAccountsRequest = { password: string };
export type GetMerchantAccountsResponse = { accounts: MerchantAccount[] };

export type UpdateBankDetailsRequest = {
  name: string;
  accountNumber: string;
  sortCode: string;
};
