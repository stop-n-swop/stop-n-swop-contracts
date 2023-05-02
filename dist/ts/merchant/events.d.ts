import { TransactionType } from '../payment';
import type { ErrorMessage, Message, Signal } from '../utils';
import type { Merchant, MerchantAccount } from './entities';
export type MerchantSignals = {
    fetch_merchant: Signal<{
        userId: string;
        merchantId: string;
        authToken: string;
    }>;
    fetch_merchant_account: Signal<{
        userId: string;
        merchantId: string;
        password: string;
        authToken: string;
    }>;
    create_mechant: Signal<{
        userId: string;
        authToken: string;
    }>;
    adjust_balance: Signal<{
        userId: string;
        authToken: string;
        amount: number;
        currency: string;
        fee: number;
        type: TransactionType;
        listingId?: string;
        orderId?: string;
    }>;
    update_bank: Signal<{
        userId: string;
        merchantId: string;
        authToken: string;
        name: string;
        sortCode: string;
        accountNumber: string;
    }>;
};
export type MerchantMessages = {
    merchant_fetched: Message<{
        merchant: Merchant;
    }>;
    fetch_merchant_failed: ErrorMessage<{
        merchantId: string;
    }>;
    merchant_account_fetched: Message<{
        merchant: MerchantAccount;
    }>;
    fetch_merchant_account_failed: ErrorMessage;
    balance_adjusted: Message<{
        userId: string;
    }>;
    adjust_balance_failed: ErrorMessage<{
        userId: string;
    }>;
    bank_updated: Message<{
        userId: string;
        merchantId: string;
    }>;
    update_bank_failed: ErrorMessage<{
        userId: string;
        merchantId: string;
    }>;
    merchant_created: Message<{
        userId: string;
        merchantId: string;
    }>;
    create_merchant_failed: ErrorMessage<{
        userId: string;
    }>;
};
