export type PaymentEvents = {
    payment_intent_succeeded: {
        userId: string;
        orderId: string;
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
        message: string;
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
    transfer_order_funds_failed: {
        listingId: string;
        message: string;
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
    };
    order_refund_failed: {
        userId: string;
        orderId: string;
        message: string;
    };
};
