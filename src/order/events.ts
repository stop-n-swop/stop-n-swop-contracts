/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
import type { AuditItem } from '../listing';
import type { ErrorMessage, Message, Signal } from '../utils';
import type { Order } from './entities';
import type { Status } from './enums';

export type OrderSignals = {
  // READ
  fetch_order: Signal<{ id: string; authToken: string }>;
  fetch_order_history: Signal<{ orderId: string; authToken: string }>;
  search_orders: Signal<{
    authToken: string;
    listingId?: string;
    username?: string;
    active?: boolean;
    userId?: string;
    status?: Status;
  }>;
  // WRITE
  create_order: Signal<{
    listingId: string;
    userId: string;
    authToken: string;
  }>;
  delete_orders: Signal<{
    authToken: string;
    userId?: string;
    status?: Status[];
  }>;
  update_order: Signal<{
    authToken: string;
    userId: string;
    orderId: string;
    trackingProvider?: string;
    trackingNumber?: string;
    postedAt?: Date;
  }>;
  change_order_status: Signal<{
    authToken: string;
    orderId: string;
    userId: string;
    status: Status;
  }>;
  place_order: Signal<{
    authToken: string;
    orderId: string;
  }>;
  decline_outstanding_orders: Signal<{ listingId: string }>;
  complete_abandoned_orders: Signal;
  warn_abandoned_orders: Signal;
  purge_cancelled_orders: Signal;
};

export type OrderMessages = {
  // READ
  order_fetched: Message<{ order: Order }>;
  fetch_order_failed: ErrorMessage<{ id: string }>;
  order_history_fetched: Message<{ history: AuditItem[] }>;
  fetch_order_history_failed: ErrorMessage<{ orderId: string }>;
  orders_searched: Message<{ orders: Order[] }>;
  search_orders_failed: ErrorMessage;
  // WRITE
  order_created: Message<{
    orderId: string;
    listingId: string;
    userId: string;
  }>;
  order_create_failed: ErrorMessage<{ listingId: string; userId: string }>;
  order_deleted: Message<{
    orderId: string;
  }>;
  orders_deleted: Message;
  delete_orders_failed: ErrorMessage;
  order_updated: Message<{
    orderId: string;
    listingId: string;
    userId: string;
    fields: Record<string, any>;
  }>;
  order_update_failed: ErrorMessage<{
    orderId: string;
    fields: Record<string, any>;
  }>;
  order_placed: Message<{ orderId: string }>;
  place_order_failed: ErrorMessage<{ orderId: string }>;
  order_status_changed: Message<{
    orderId: string;
    listingId: string;
    userId: string;
    status: Status;
  }>;
  order_status_failed: ErrorMessage<{
    orderId: string;
    status: Status;
  }>;
  order_expiring_soon: Message<{
    orderId: string;
    listingId: string;
  }>;
};

export type OrderEvents = {};
