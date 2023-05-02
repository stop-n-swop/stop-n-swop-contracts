export declare enum TransactionType {
    PENDING = "pending",
    PENDING_PAYOUT = "pendingPayout",
    PAY_IN = "pay-in",
    PURCHASE = "purchase",
    REFUND = "refund",
    TRANSFER = "transfer",
    PAYOUT = "pay-out"
}
export interface Transaction {
    id: string;
    listingId?: string;
    orderId?: string;
    date: Date;
    type: TransactionType;
    amount: number;
    fees: number;
    currency: string;
}
