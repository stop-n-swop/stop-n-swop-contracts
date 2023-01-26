import { Status } from '../order';
import { AuditItem, Listing, Discount } from './entities';
import { Condition, Region } from './enums';
import { Address } from '../user';
export type CreateListingRequest = Omit<UpdateListingRequest, 'id'> & {
    status?: Status;
};
export interface CreateListingResponse {
    id: string;
}
export type UpdateListingRequest = Omit<Listing, 'createdDate' | 'username' | 'location' | 'rating' | 'status' | 'id' | 'discount' | 'completedDate'>;
export type UpdateListingResponse = Listing;
export interface SearchListingsRequest {
    productId?: string;
    boxed?: boolean;
    instructions?: boolean;
    condition?: Condition | Condition[];
    region?: Region | Region[];
    rating?: number;
    minPrice?: number;
    maxPrice?: number;
    status?: Status;
    username?: string;
    sortBy?: string;
    limit?: number;
    ids?: string[];
}
export interface SearchListingsResponse {
    listings: Listing[];
}
export interface GetListingParams {
    listingId: string;
}
export type GetListingRequest = void;
export type GetListingResponse = Listing;
export interface GetProductsListingCountRequest {
    productIds?: string[];
    gameIds?: string[];
}
export interface GetProductsListingCountResponse {
    counts: Array<{
        productId: string;
        count: number;
    }>;
}
export interface GetCompletedListingCountParams {
    userId: string;
}
export interface GetCompletedListingCountResponse {
    count: number;
}
export interface GetListingHistoryParams {
    listingId: string;
}
export type GetListingHistoryRequest = void;
export interface GetListingHistoryResponse {
    history: AuditItem[];
}
export interface ChangeListingStatusParams {
    listingId: string;
}
export interface ChangeListingStatusRequest {
    status: Status;
}
export type ChangeListingStatusResponse = Record<string, never>;
export interface GetListingAddressParams {
    listingId: string;
}
export interface GetListingAddressResponse {
    name: string;
    address: Address;
}
export type GetDiscountParams = {
    productId: string;
};
export type GetDiscountBody = void;
export type GetDiscountResponse = Discount;
export type GetRelatedListingsParams = {
    listingId: string;
};
export type GetRelatedListingsResponse = {
    listings: Listing[];
};
