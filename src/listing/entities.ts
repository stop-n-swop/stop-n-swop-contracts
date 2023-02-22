import type { Region, VerifyStatus } from './enums';
import type { Status } from '../order/enums';

export interface Stats {
  region: Region;
  boxed: boolean;
  instructions: boolean;
  new: boolean;
}

export interface Listing {
  id: string;
  productIds: string[];
  images: string[];
  price: number;
  postage: number;
  currency: string;
  stats: Stats;
  description: string;
  // calculated
  createdDate: Date;
  completedDate: Date;
  // computed
  userId: string;
  username: string;
  location: string;
  rating: number;
  status: Status;
  verified: VerifyStatus;
}

export interface AuditItem {
  orderId: string;
  listingId: string;
  date: Date;
  username: string;
  status: Status;
}
