/* eslint-disable @typescript-eslint/ban-types */

import { Status } from './order';

/* eslint-disable camelcase */
export type Events = {
  // Global
  long_purge: {};
  short_purge: {};
  // Listing
  listing_created: {
    listingId: string;
    userId: string;
  };
  listing_updated: {
    listingId: string;
    userId: string;
  };
  listing_status_changed: {
    listingId: string;
    userId: string;
    status: Status;
  };
  listing_image_approved: {
    listingId: string;
    imageKey: string;
    userId: string;
  };
  listing_image_rejected: {
    listingId: string;
    imageKey: string;
    userId: string;
    reason: string;
  };
  // Order
  order_created: {
    orderId: string;
    listingId: string;
    userId: string;
  };
  order_updated: {
    orderId: string;
    listingId: string;
    userId: string;
    fields: Record<string, any>;
  };
  order_status_changed: {
    orderId: string;
    listingId: string;
    userId: string;
    status: Status;
  };
  order_payin_started: {
    orderId: string;
    listingId: string;
    userId: string;
    cashToPay: number;
    balanceUsed: number;
    paymentId: string;
  };
  order_payin_completing: {
    orderId: string;
    listingId: string;
    userId: string;
    cashToPay: number;
    balanceUsed: number;
    paymentId: string;
  };
  order_payin_completed: {
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
  };
  order_payin_failed: {
    orderId: string;
    listingId: string;
    userId: string;
    error: Error;
  };
  order_funds_transferred: {
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
  };
  order_refunded: {
    orderId: string;
    listingId: string;
    userId: string;
    listedAmount: number;
    orderProtectionFee: number;
    amountRefunded: number;
    platformProfit: number;
    currency: string;
    // providerFees: number;
  };
  order_expiring_soon: {
    orderId: string;
    listingId: string;
  };
  // User
  user_updated: {
    userId: string;
  };
  merchant_created: {
    userId: string;
    merchantId: string;
  };
  // Payments
  payment_intent_succeeded: {
    userId: string;
    orderId: string;
  };
  seller_pay_out: {
    userId: string;
    currency: string;
    amountRequested: number;
    amountTransferred: number;
    fee: number;
  };
};
