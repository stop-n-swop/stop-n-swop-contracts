import { Transaction } from './entities';

export interface StartPaymentParams {
  orderId: string;
}
export type StartOrderBody = Record<string, never>;
export interface StartOrderResponse {
  paymentId: string;
}

export interface PlaceOrderParams {
  orderId: string;
}
export type PlaceOrderRequest = Record<string, never>;
export type PlaceOrderResponse = Record<string, never>;

export interface GetTransactionsResponse {
  transactions: Transaction[];
}

export interface WithdrawBalanceRequest {
  amount: number;
}
