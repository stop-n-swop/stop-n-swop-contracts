import type { Payout } from '../merchant';
import type { ErrorMessage, Message, Signal } from '../utils';
import { Transaction } from './entities';
export type PaymentSignals = {
    fetch_payment_intent: Signal<{
        authToken: string;
        paymentId: string;
    }>;
    fetch_payouts: Signal<{
        userId: string;
        authToken: string;
    }>;
    fetch_transactions: Signal<{
        userId: string;
        authToken: string;
    }>;
    start_pay_in: Signal<{
        authToken: string;
        userId: string;
        amount: number;
        currency: string;
    }>;
    complete_pay_in: Signal<{
        authToken: string;
        userId: string;
        paymentId: string;
    }>;
    refund_order: Signal<{
        userId: string;
        orderId: string;
        authToken: string;
    }>;
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
    payout: Signal<{
        userId: string;
        merchantId: string;
        authToken: string;
    }>;
};
export type PaymentMessages = {
    payment_intent_fetched: Message<{
        secret: string;
        status: string;
    }>;
    fetch_payment_intent_failed: ErrorMessage;
    payouts_fetched: Message<{
        payouts: Payout[];
    }>;
    fetch_payouts_failed: ErrorMessage;
    transactions_fetched: Message<{
        transactions: Transaction[];
    }>;
    fetch_transactions_failed: ErrorMessage;
    payment_intent_succeeded: Message<{
        userId: string;
        paymentId: string;
    }>;
    payin_started: Message<{
        userId: string;
        paymentId: string;
        amount: number;
        currency: string;
    }>;
    payin_completed: Message<{
        userId: string;
        paymentId: string;
        amount: number;
        currency: string;
        providerFee: number;
    }>;
    payin_failed: ErrorMessage<{
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
