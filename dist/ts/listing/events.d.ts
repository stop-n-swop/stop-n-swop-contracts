import type { Signal, Message, ErrorMessage } from '../utils';
import type { Status } from '../order';
import type { AuditItem, Listing, Stats } from './entities';
import type { Address } from '../user';
import type { Condition, Region, VerifyStatus } from './enums';
export type ListingSignals = {
    fetch_listing: Signal<{
        id: string;
    }>;
    fetch_listing_address: Signal<{
        listingId: string;
        authToken: string;
    }>;
    fetch_listing_history: Signal<{
        listingId: string;
        authToken: string;
    }>;
    fetch_listing_counts: Signal<{
        productIds?: string[];
        gameIds?: string[];
    }>;
    fetch_suggestions: Signal<{
        userId: string;
        authToken: string;
    }>;
    search_listings: Signal<{
        authToken?: string;
        productId?: string;
        username?: string;
        userId?: string;
        boxed?: boolean;
        instructions?: boolean;
        condition?: Condition[];
        region?: Region[];
        status?: Status;
        rating?: number;
        minPrice?: number;
        maxPrice?: number;
        sortBy?: string;
        limit?: number;
        ids?: string[];
        verified?: VerifyStatus;
    }>;
    fetch_related_listings: Signal<{
        listingId: string;
    }>;
    change_listing_status: Signal<{
        authToken: string;
        listingId: string;
        status: Status;
    }>;
    create_listing: Signal<{
        authToken: string;
        productIds: string[];
        images: string[];
        price: number;
        postage: number;
        currency: string;
        stats: Stats;
        description?: string;
        userId: string;
        username: string;
        status?: Status;
    }>;
    update_listing: Signal<{
        authToken: string;
        id: string;
        productIds: string[];
        images: string[];
        price: number;
        postage: number;
        currency: string;
        stats: Stats;
        description?: string;
    }>;
    delete_listing: Signal<{
        authToken: string;
        listingId: string;
    }>;
    sync_listing_rating: Signal<{
        id: string;
        authToken: string;
    }>;
    sync_listing_status: Signal<{
        listingId: string;
        authToken: string;
    }>;
    verify_listing: Signal<{
        listingId: string;
        authToken: string;
        value: boolean;
        reason: string;
    }>;
};
export type ListingMessages = {
    listing_fetched: Message<{
        listing: Listing;
    }>;
    fetch_listing_failed: ErrorMessage<{
        id: string;
    }>;
    listing_address_fetched: Message<{
        name: string;
        address: Address;
    }>;
    fetch_listing_address_failed: ErrorMessage<{
        listingId: string;
    }>;
    listing_history_fetched: Message<{
        history: AuditItem[];
    }>;
    fetch_listing_history_failed: ErrorMessage<{
        listingId: string;
    }>;
    listing_counts_fetched: Message<{
        counts: Array<{
            productId: string;
            count: number;
        }>;
    }>;
    fetch_listing_counts_failed: ErrorMessage<{
        productIds?: string[];
        gameIds?: string[];
    }>;
    suggestions_fetched: Message<{
        listings: Listing[];
    }>;
    fetch_suggestions_failed: ErrorMessage<{
        userId: string;
    }>;
    listings_searched: Message<{
        listings: Listing[];
    }>;
    search_listings_failed: ErrorMessage;
    related_listings_fetched: Message<{
        listings: Listing[];
    }>;
    fetch_related_listings_failed: ErrorMessage;
    listing_status_changed: Message<{
        listingId: string;
        status: Status;
    }>;
    listing_status_failed: ErrorMessage<{
        listingId: string;
    }>;
    listing_created: Message<{
        listingId: string;
        userId: string;
    }>;
    create_listing_failed: ErrorMessage<{
        userId: string;
        productIds: string[];
    }>;
    listing_updated: Message<{
        listingId: string;
        userId: string;
        fields: Record<string, any>;
    }>;
    listing_update_failed: ErrorMessage<{
        listingId: string;
        fields: Record<string, any>;
    }>;
    listing_deleted: Message<{
        listingId: string;
    }>;
    listing_delete_failed: ErrorMessage<{
        listingId: string;
    }>;
    listing_rating_changed: Message<{
        listingId: string;
        userId: string;
        rating: number;
    }>;
    listing_verified: Message<{
        listingId: string;
        value: boolean;
        reason: string;
    }>;
    verify_listing_failed: ErrorMessage<{
        listingId: string;
    }>;
};
