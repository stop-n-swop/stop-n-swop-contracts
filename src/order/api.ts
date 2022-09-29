import { AuditItem } from '../listing/entities';
import { Order } from './entities';

export interface SearchOrdersRequest {
  listingId?: string;
  username?: string;
  active?: boolean;
}
export interface SearchOrdersResponse {
  orders: Order[];
}

export interface GetOrderParams {
  orderId: string;
}
export type GetOrderRequest = void;
export type GetOrderResponse = Order;

export interface CreateOrderRequest {
  listingId: string;
}
export interface CreateOrderResponse {
  id: string;
}

export interface UpdateOrderStatusParams {
  orderId: string;
}
export type UpdateOrderStatusRequest = Pick<Order, 'status'>;
export type UpdateOrderStatusResponse = Order;

export interface PatchOrderParams {
  orderId: string;
}
export type PatchOrderRequest = Pick<
  Partial<Order>,
  'trackingNumber' | 'trackingProvider' | 'useBalance'
>;
export type PatchOrderResponse = Order;

export interface GetOrderHistoryParams {
  orderId: string;
}
export type GetOrderHistoryRequest = void;
export interface GetOrderHistoryResponse {
  history: AuditItem[];
}
