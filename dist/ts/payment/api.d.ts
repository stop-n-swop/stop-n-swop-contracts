import { Transaction } from './entities';
export interface StartPaymentParams {
    orderId: string;
}
export type StartOrderBody = Record<string, never>;
export type StartOrderResponse = Record<string, never>;
export type GetClientSecretParams = {
    orderId: string;
};
export type GetClientSecretResponse = {
    secret: string;
    status: 'canceled' | 'processing' | 'requires_action' | 'requires_capture' | 'requires_confirmation' | 'requires_payment_method' | 'succeeded';
};
export interface GetTransactionsResponse {
    transactions: Transaction[];
}
export interface WithdrawBalanceRequest {
    amount: number;
}
