import { Merchant, Payout, MerchantAccount } from './entities';
export type GetMerchantResponse = Merchant;
export type GetMerchantAccountRequest = {
    password: string;
};
export type GetMerchantAccountResponse = MerchantAccount;
export type GetPayoutsResponse = {
    payouts: Payout[];
};
export type UpdateBankDetailsRequest = {
    name: string;
    accountNumber: string;
    sortCode: string;
};
