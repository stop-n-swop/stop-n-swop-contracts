import type { ListingEvents } from './listing/events';
import type { MerchantEvents } from './merchant/events';
import type { OrderEvents } from './order/events';
import type { PaymentEvents } from './payment/events';
import type { UserEvents } from './user/events';
import type { ProductEvents } from './product/events';
type GlobalEvents = {
    long_purge: {};
    short_purge: {};
};
export type Events = GlobalEvents & ListingEvents & MerchantEvents & OrderEvents & PaymentEvents & UserEvents & ProductEvents;
export {};
