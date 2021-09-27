import { Address } from "../user";
import type { Status } from "./enums";

export interface Order {
  id: string;
  listingId: string;
  username: string;
  status: Status;
  created: Date;
  deliveryAddress: Address;
  errorCode: string;
  postedDate: Date;
  trackingProvider: string;
  trackingNumber: string;
}
