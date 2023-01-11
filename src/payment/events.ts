/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */

import type { Payout } from '../merchant';
import type { ErrorMessage, Message, Signal } from '../utils';
import { Transaction } from './entities';

export type PaymentSignals = {
  // READ
  fetch_payment_intent: Signal<{ authToken: string; orderId: string }>;
  fetch_payouts: Signal<{ userId: string; authToken: string }>;
  fetch_transactions: Signal<{ userId: string; authToken: string }>;
  // WRITE
  start_pay_in: Signal<{ authToken: string; userId: string; orderId: string }>;
  continue_pay_in: Signal<{
    userId: string;
    orderId: string;
    authToken: string;
  }>;
  complete_pay_in: Signal<{
    userId: string;
    orderId: string;
    authToken: string;
  }>;
  refund_order: Signal<{ userId: string; orderId: string; authToken: string }>;
  transfer_funds: Signal<{
    authToken: string;
    listingId: string;
  }>;
  withdraw_funds: Signal<{
    userId: string;
    merchantId: string;
    authToken: string;
    amount: number;
  }>;
  payout: Signal<{ userId: string; merchantId: string; authToken: string }>;
};

export type PaymentMessages = {
  // READ
  payment_intent_fetched: Message<{ secret: string; status: string }>;
  fetch_payment_intent_failed: ErrorMessage;
  payouts_fetched: Message<{ payouts: Payout[] }>;
  fetch_payouts_failed: ErrorMessage;
  transactions_fetched: Message<{ transactions: Transaction[] }>;
  fetch_transactions_failed: ErrorMessage;
  // WRITE
  payment_intent_succeeded: Message<{
    userId: string;
    orderId: string;
  }>;
  order_payin_started: Message<{
    orderId: string;
    listingId: string;
    userId: string;
    cashToPay: number;
    balanceUsed: number;
    paymentId: string;
  }>;
  order_payin_completing: Message<{
    orderId: string;
    listingId: string;
    userId: string;
    cashToPay: number;
    balanceUsed: number;
    paymentId: string;
  }>;
  order_payin_completed: Message<{
    orderId: string;
    listingId: string;
    userId: string;
    balanceUsed: number;
    amountDebited: number;
    providerFees: number;
    amountCredited: number;
    platformFees: number;
    orderProtectionFee: number;
    totalListingCharges: number;
    amountAvailableToSeller: number;
    currency: string;
  }>;
  order_payin_failed: ErrorMessage<{
    orderId: string;
    listingId: string;
    userId: string;
  }>;
  order_funds_transferred: Message<{
    userId: string;
    orderId: string;
    listingId: string;
    listedAmount: number;
    platformFees: number;
    orderProtectionFee: number;
    totalListingCharges: number;
    amountTransferred: number;
    platformProfit: number;
    currency: string;
  }>;
  transfer_order_funds_failed: ErrorMessage<{
    listingId: string;
  }>;
  order_refunded: Message<{
    orderId: string;
    listingId: string;
    userId: string;
    listedAmount: number;
    orderProtectionFee: number;
    amountRefunded: number;
    platformProfit: number;
    currency: string;
    // providerFees: number;
  }>;
  order_refund_failed: ErrorMessage<{
    userId: string;
    orderId: string;
  }>;
  funds_withdrawn: Message<{
    currency: string;
    userId: string;
    amountRequested: number;
    amountTransferred: number;
    platformCharge: number;
    providerCharge: number;
  }>;
  withdraw_funds_failed: ErrorMessage<{
    userId: string;
    merchantId: string;
    amount: number;
  }>;
  payout_complete: Message<{
    userId: string;
    merchantId: string;
    amount: number;
  }>;
  payout_failed: ErrorMessage<{
    userId: string;
    merchantId: string;
    amount: number;
  }>;
};
