import type { Condition, Region } from "./enums";
import type { Status } from "../order";
export interface Stats {
    condition: Condition;
    region: Region;
    boxed: boolean;
    instructions: boolean;
}
export interface Listing {
    id: string;
    products: Array<{
        productId: string;
        platformId: string;
    }>;
    images: Record<string, string>;
    price: number;
    postage: number;
    currency: string;
    stats: Stats;
    description: string;
    createdDate: Date;
    username: string;
    location: string;
    rating: number;
}
export interface AuditItem {
    listingId: string;
    date: Date;
    username: string;
    status: Status;
}
