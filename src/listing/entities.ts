import type { Condition, Region } from './enums';
import type { Status } from '../order/enums';

export interface Stats {
  condition: Condition;
  region: Region;
  boxed: boolean;
  instructions: boolean;
}

export interface Listing {
  id: string;
  productIds: string[];
  images: Record<string, string>;
  price: number;
  postage: number;
  discount?: Discount;
  currency: string;
  stats: Stats;
  description: string;
  // calculated
  createdDate: Date;
  // computed
  username: string;
  location: string;
  rating: number;
  status: Status;
}

export interface AuditItem {
  orderId: string;
  listingId: string;
  date: Date;
  username: string;
  status: Status;
}

export interface Discount {
  name: string;
  percentage: number;
  fixed: number;
}
