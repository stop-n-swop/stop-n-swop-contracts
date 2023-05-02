import { Transaction } from './entities';
export type StartPayinParams = Record<string, never>;
export type StartPayinBody = {
    amount: number;
};
export type StartPayinResponse = {
    paymentId: string;
};
export type GetClientSecretParams = {
    paymentId: string;
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
