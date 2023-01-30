import type { Condition, Region, VerifyStatus } from './enums';
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
    images: string[];
    price: number;
    postage: number;
    discount?: Discount;
    currency: string;
    stats: Stats;
    description: string;
    createdDate: Date;
    completedDate: Date;
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
export interface Discount {
    name: string;
    percentage: number;
    fixed: number;
}
