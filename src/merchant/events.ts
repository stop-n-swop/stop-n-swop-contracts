/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable camelcase */
export type MerchantEvents = {
  merchant_created: {
    userId: string;
    merchantId: string;
  };
  create_merchant_failed: {
    userId: string;
    message: string;
  };
  merchant_withdrawal: {
    userId: string;
    currency: string;
    amountRequested: number;
    amountTransferred: number;
    fee: number;
  };
  withdrawal_failed: {
    userId: string;
    merchantId: string;
    amount: number;
  };
  merchant_bank_updated: { userId: string; merchantId: string };
  update_merchant_bank_failed: {
    userId: string;
    merchantId: string;
    message: string;
  };
  payout_complete: {
    userId: string;
    merchantId: string;
    amount: number;
  };
  balance_adjusted: { userId: string };
};
