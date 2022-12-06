/* eslint-disable @typescript-eslint/ban-types */

import type { ListingEvents } from './listing/events';
import type { MerchantEvents } from './merchant/events';
import type { OrderEvents } from './order/events';
import type { PaymentEvents } from './payment/events';
import type { UserEvents } from './user/events';
import type { ProductEvents } from './product/events';

/* eslint-disable camelcase */
type GlobalEvents = {
  // Global
  long_purge: {};
  short_purge: {};
};

export type Events = GlobalEvents &
  ListingEvents &
  MerchantEvents &
  OrderEvents &
  PaymentEvents &
  UserEvents &
  ProductEvents;
